// assets/scripts.js
document.addEventListener('DOMContentLoaded', () => {
  // Fetch GBP data from the server
  fetch('/api/gbp')
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error:', data.error);
        if (data.error === 'Unauthorized') {
          window.location.href = '/login.html';
        } else {
          alert('An error occurred while fetching your business data.');
        }
      } else if (data.noGbp) {
        // Handle case where no GBP is found
        document.getElementById('businessTitle').innerText = 'No Business Profile Found';
        document.getElementById('businessDescription').innerText = data.message;
        // Hide or disable other elements as needed
      } else {
        // Display the GBP data
        const location = data.locations[0]; // Assuming we take the first location

        // Update business info
        document.getElementById('businessTitle').innerText = location.title || 'Business Name';
        document.getElementById('businessDescription').innerText = location.additionalCategories?.[0]?.displayName || '';

        // Update other elements as needed
        // For example:
        document.getElementById('displayBusinessName').innerText = location.title || '';
        document.getElementById('displayFormattedAddress').innerText = location.storefrontAddress?.formattedAddress || '';

        // Continue updating the page with the GBP data
      }
    })
    .catch(error => {
      console.error('Error fetching GBP data:', error);
      alert('An error occurred while fetching your business data.');
    });
});
