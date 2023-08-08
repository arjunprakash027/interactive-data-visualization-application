import React from 'react';
import './App.css';
import BarChart from './visualizations/bar.js';
import ConsBar from './visualizations/constrain_bar.js';
import HistChart from './visualizations/histogram';
import LineChart from './visualizations/linechart.js';

function App() {
  return (
    <div className="homepage">
      <header className="header">
        <h1>Interactive Data Visualizations</h1>
        <p>Explore and analyze data through interactive charts</p>
      </header>
      <section className="visualization-section">
        <div className="visualization">
          <BarChart />
        </div>
        <div className="visualization">
          <ConsBar />
        </div>
        <div className="visualization">
          <HistChart />
        </div>
        <div className="visualization">
          <LineChart />
        </div>
      </section>
      <footer className="footer">
        <p>&copy; developed by ARJUN.</p>
        <p>Find me on <a href="https://github.com/arjunprakash027">GitHub</a> or contact me via email at arjunprakash027@gmail.com.</p>
      </footer>
    </div>
  );
}

export default App;
