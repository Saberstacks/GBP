// assets/scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // Data Object
  let data = {
    business_name: "Sunshine Bakery",
    business_type: "Bakery",
    categories: "Bakery, Cafe, Dessert Shop",
    description: "Sunshine Bakery offers fresh, homemade pastries, cakes, and seasonal treats. Enjoy a cozy atmosphere with locally sourced coffee and gluten-free options available.",
    status: "Open",
    business_opened_on: "2010-05-14",
    // Add other data fields as needed
  };

  // Load data from localStorage if available
  if (localStorage.getItem('businessData')) {
    data = JSON.parse(localStorage.getItem('businessData'));
  }

  // Function to display Overview data
  function displayOverview() {
    document.getElementById('displayBusinessName').textContent = data.business_name;
    document.getElementById('displayBusinessType').textContent = data.business_type;
    document.getElementById('displayCategories').textContent = data.categories;
    document.getElementById('displayDescription').textContent = data.description;
    document.getElementById('displayStatus').textContent = data.status;
    document.getElementById('displayOpenedOn').textContent = data.business_opened_on;

    // Update header section
    document.getElementById('businessTitle').textContent = data.business_name;
    document.getElementById('businessDescription').textContent = data.description;
  }

  // Function to populate Edit fields
  function populateEditFields() {
    document.getElementById('editBusinessName').value = data.business_name;
    document.getElementById('editBusinessType').value = data.business_type;
    document.getElementById('editCategories').value = data.categories;
    document.getElementById('editDescription').value = data.description;
    document.getElementById('editStatus').value = data.status;
    document.getElementById('editOpenedOn').value = data.business_opened_on;
  }

  // Function to toggle between Preview and Edit modes
  function toggleMode(isEditMode) {
    // Toggle buttons
    document.getElementById('editButton').disabled = isEditMode;
    document.getElementById('previewButton').disabled = !isEditMode;

    // Toggle Overview section
    document.getElementById('overviewDisplay').style.display = isEditMode ? 'none' : 'block';
    document.getElementById('overviewEdit').style.display = isEditMode ? 'block' : 'none';

    if (isEditMode) {
      populateEditFields();
    } else {
      displayOverview();
    }
  }

  // Update Overview data
  window.updateOverview = function() {
    data.business_name = document.getElementById('editBusinessName').value;
    data.business_type = document.getElementById('editBusinessType').value;
    data.categories = document.getElementById('editCategories').value;
    data.description = document.getElementById('editDescription').value;
    data.status = document.getElementById('editStatus').value;
    data.business_opened_on = document.getElementById('editOpenedOn').value;

    // Save data to localStorage
    localStorage.setItem('businessData', JSON.stringify(data));

    alert('Overview updated successfully!');
    toggleMode(false);
  };

  // Event listeners for mode buttons
  document.getElementById('editButton').addEventListener('click', () => {
    toggleMode(true);
  });

  document.getElementById('previewButton').addEventListener('click', () => {
    toggleMode(false);
  });

  // Initial display
  displayOverview();
});
