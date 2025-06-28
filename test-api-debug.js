// Test script to debug API response
const API_URL = 'http://localhost:1338';

async function testAPI() {
  try {
    console.log('Testing API at:', API_URL);
    
    // Test basic endpoint
    const response = await fetch(`${API_URL}/api/recipies?populate=*`);
    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);
    
    if (!response.ok) {
      console.error('API not responding correctly');
      return;
    }
    
    const data = await response.json();
    console.log('Full response:', JSON.stringify(data, null, 2));
    
    if (data && data.data) {
      console.log('Data array length:', data.data.length);
      if (data.data.length > 0) {
        console.log('First recipe:', JSON.stringify(data.data[0], null, 2));
      }
    } else {
      console.log('No data array found in response');
    }
    
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testAPI(); 