import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = () => {
  const [data, setData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('likelihood');

  const chartRef = useRef();

  const renderChart = () => {
    if (data.length === 0) {
      console.log('No data available');
      return; // Return early if no data available
    } else {
      console.log('Rendering chart');
    }

    const labels = data.map((d) => d.label);
    const values = data.map((d) => d.value);


    // Clear existing chart if any
    d3.select(chartRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const xScale = d3.scaleBand().range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().range([height, 0]);

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    xScale.domain(labels);
    yScale.domain([0, d3.max(values)]);

    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.label))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.value))
      .attr('fill', (d, i) => ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#00ffff'][i]);

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
      const response = await fetch('http://127.0.0.1:5000/bar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: selectedFilter, // Replace this with the desired filter value
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const Newdata = await response.json();

      // Assuming the data received is in the format { label: '...', value: ... }
      console.log(Newdata);
      var json_data = JSON.parse(Newdata);
      console.log(json_data)
      setData(json_data);
      console.log(Object.keys(json_data));
      console.log(Object.values(json_data));

      const formattedData = Object.keys(json_data).map((label) => ({
        label,
        value: json_data[label],
      }));


      console.log(formattedData);
      setData(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

  useEffect(() => {
    renderChart();
  },[data]);


  const filterOptions = ['end_year', 'intensity', 'sector', 'topic','region',
  'start_year', 'impact', 'country', 'relevance', 'likelihood'];

  return (
    <div>
      <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)}>
        {filterOptions.map((filter) => (
          <option key={filter} value={filter}>
            {filter}
          </option>
        ))}
      </select>
      <div ref={chartRef}></div>
    </div>
  );
};

export default BarChart;
