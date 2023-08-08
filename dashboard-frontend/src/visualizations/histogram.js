import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HistChart = () => {
    const [data, setData] = useState([]);
    const [selectedFilter1, setSelectedFilter1] = useState('country');
    const [selectedFilter2, setSelectedFilter2] = useState('sector');
  
    const chartRef = useRef();
  
    const renderChart = () => {
      if (data.length === 0) {
        console.log('No data available');
        return; // Return early if no data available
      } else {
        console.log('Rendering chart');
      }
  
      // Clear existing chart if any
      d3.select(chartRef.current).selectAll('*').remove();
  
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = 500 - margin.left - margin.right;
      const height = 300 - margin.top - margin.bottom;
  
      const stackKeys = Object.keys(data[0]).filter((key) => key !== 'label'); // Extract keys for stacking
      const stack = d3.stack().keys(stackKeys);
  
      const stackedData = stack(data);
  
      const xScale = d3.scaleBand().domain(data.map((d) => d.label)).range([0, width]).padding(0.1);
      const yScale = d3.scaleLinear().domain([0, d3.max(stackedData, (d) => d3.max(d, (dd) => dd[1]))]).range([height, 0]);
      const color = d3.scaleOrdinal(d3.schemeCategory10);
  
      const svg = d3
        .select(chartRef.current)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
  
      svg
        .selectAll('.serie')
        .data(stackedData)
        .enter()
        .append('g')
        .attr('fill', (d) => color(d.key))
        .selectAll('rect')
        .data((d) => d)
        .enter()
        .append('rect')
        .attr('x', (d) => xScale(d.data.label))
        .attr('y', (d) => yScale(d[1]))
        .attr('height', (d) => yScale(d[0]) - yScale(d[1]))
        .attr('width', xScale.bandwidth());
  
      svg
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(xScale));
  
      svg.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));
  
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom)
        .style('text-anchor', 'middle')
        .text('Likelihood');
  
      svg
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - height / 2)
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Value');
    };
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/groupby_histo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filter1: selectedFilter1,
            filter2: selectedFilter2,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const jsonData = await response.json();
        var json_data = JSON.parse(jsonData)
        console.log(json_data);
  
        const formattedData = Object.entries(json_data).map(([label, values]) => {
          return {
            label,
            ...values,
          };
        });
  
        console.log("formatted:",formattedData);
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, [selectedFilter1, selectedFilter2]);
  
    useEffect(() => {
      renderChart();
    }, [data]);

    const filterOptions = ['end_year', 'intensity', 'sector', 'topic', 'region', 'start_year', 'impact', 'country', 'relevance', 'likelihood'];
    

    return (
      <div>
        <div>
          <select value={selectedFilter1} onChange={(e) => setSelectedFilter1(e.target.value)}>
            {filterOptions.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        

          <select value={selectedFilter2} onChange={(e) => setSelectedFilter2(e.target.value)}>
            {filterOptions.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>

        </div>

        <div ref={chartRef}></div>
      </div>
    );
  };

export default HistChart;
