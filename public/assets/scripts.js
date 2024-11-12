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
          alert('An error occurred while fetching your business data: ' + data.error);
        }
      } else if (data.noGbp || !data.locations || data.locations.length === 0) {
        // Handle case where no GBP is found
        document.getElementById('businessTitle').innerText = 'No Business Profile Found';
        document.getElementById('businessDescription').innerText = 'Please create a Google Business Profile to view your business data.';
        // Hide or disable other elements as needed
      } else {
        // Display the GBP data
        const location = data.locations[0]; // Assuming we take the first location

        console.log('Location Data:', location); // Debugging

        // Update business info
        document.getElementById('businessTitle').innerText = location.title || 'Business Name';
        document.getElementById('businessDescription').innerText = location.categories?.primaryCategory?.displayName || '';

        // Update other elements as needed
        document.getElementById('displayBusinessName').innerText = location.title || '';
        document.getElementById('displayFormattedAddress').innerText = location.storefrontAddress?.formattedAddress || '';
        document.getElementById('displayPrimaryPhone').innerText = location.primaryPhone || '';
        document.getElementById('displayWebsiteUrl').innerText = location.websiteUri || '';

        // Additional data can be displayed similarly
      }
    })
    .catch(error => {
      console.error('Error fetching GBP data:', error);
      alert('An error occurred while fetching your business data.');
    });
});
