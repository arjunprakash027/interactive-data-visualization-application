const fetchData = async () => {
    try {
      const response = await fetch(' http://127.0.0.1:5000/groupby_histo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'filter1': 'country',
          'filter2':'sector' // Replace this with the desired filter value
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data); // Handle the data or pass it to your chart rendering function
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // Call the fetchData function to fetch data from the /bar endpoint
  fetchData();