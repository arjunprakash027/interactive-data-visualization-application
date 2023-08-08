
# Interactive Data Visualization Application

The Interactive Data Visualization Application is a web-based tool developed to facilitate the exploration and analysis of a dataset through interactive charts and visualizations. The application is built using React for the frontend, Flask for the backend API, and D3.js for rendering the visualizations.

## Prerequisites

Before you begin, ensure you have the following software and tools installed:

- **Python**: You'll need Python along with Flask and SQLite3. You can download Python from the [official website](https://www.python.org/) and install Flask using `pip install flask flask-cors pandas numpy`.
- **Node.js**: The frontend of the application is built using React, which requires Node.js and npm (Node Package Manager). You can install Node.js from the [official website](https://nodejs.org/en/download/), which also comes with npm.

## Steps to Run the Application

Follow these steps to set up and run the interactive data visualization application:

### 1. Clone the Repository

Clone the repository containing the application source code:
```bash
git clone https://github.com/arjunprakash027/interactive-data-visualization-application.git
cd interactive-data-visualization-application
```

### 2. Setup the Backend (Flask API)

1. **Create Virtual Environment (Optional but Recommended)**

   It's a good practice to create a virtual environment to isolate the application's dependencies. This step is optional but recommended to avoid conflicts with other projects.

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   ```

2. **Install Required Python Packages**

   Install the necessary Python packages for the backend API:

   ```bash
   pip install flask flask-cors pandas numpy
   ```

3. **Run the Flask API**

   Start the Flask API (backend server) that will handle requests from the frontend:

   ```bash
   python app.py
   ```

   The backend will be accessible at `http://127.0.0.1:5000`.

### 3. Setup the Frontend (React App)

1. **Install Required npm Packages**

   Navigate to the frontend directory and install the required npm packages for the React app:

   ```bash
   cd frontend
   npm install
   ```

2. **Start the React App**

   Run the React app, which will open a new browser window/tab with the application:

   ```bash
   npm start
   ```

   The React app will start at `http://localhost:3000`.

## Data Visualizations

The interactive data visualization application provides various types of visualizations to explore and analyze the dataset. Each visualization corresponds to a specific route in the Flask API and is accompanied by a React component for rendering.

- **Bar Chart Visualization (BarChart)**
  - Route: /bar
  - Description: Displays a bar chart that represents intensity values based on the selected filter.

- **Constrained Bar Chart Visualization (ConsBar)**
  - Route: /constrains_bar
  - Description: Presents a constrained bar chart showing intensity values based on two selected filters and a constraint.

- **Histogram Visualization (HistChart)**
  - Route: /groupby_histo
  - Description: Demonstrates a stacked histogram showing intensity values based on two selected filters.

- **Line Chart Visualization (LineChart)**
  - Route: /count_line
  - Description: Illustrates a line chart depicting intensity values over time based on the selected filter.

## Python Files Description

Here's a description of the Python files provided for data preprocessing and backend logic:

- **app.py**: This file contains the Flask application that serves as the backend API for handling requests from the frontend. It defines routes for various data visualizations and interacts with the dataset to fetch and preprocess data for visualization.

- **jsondata.db**: This SQLite database file contains the dataset used for the application. It stores the data that will be visualized using the different types of charts and visualizations.

- **visualizations.py**: This file includes functions and logic for generating data visualizations based on different filters and constraints. It processes data from the SQLite database and returns JSON data that can be used by the frontend to render the charts.