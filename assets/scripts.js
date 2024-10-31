// assets/scripts.js

// Placeholder data
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

// Function to toggle between Edit and Preview modes
function toggleMode(mode) {
  const isEditMode = mode === 'edit';

  // Toggle header buttons
  document.getElementById('editButton').disabled = isEditMode;
  document.getElementById('previewButton').disabled = !isEditMode;

  // Toggle content sections
  toggleSection('overview', isEditMode);
  // Repeat for other sections
  // toggleSection('location', isEditMode);
  // ...

  // Update mode-specific elements
  if (isEditMode) {
    // Populate edit fields with current data
    document.getElementById('editBusinessName').value = data.business_name;
    document.getElementById('editBusinessType').value = data.business_type;
    document.getElementById('editCategories').value = data.categories;
    document.getElementById('editDescription').value = data.description;
    document.getElementById('editStatus').value = data.status;
    document.getElementById('editOpenedOn').value = data.business_opened_on;
  } else {
    // Update displayed data
    displayOverview();
  }
}

// Function to toggle individual sections
function toggleSection(section, isEditMode) {
  const contentDiv = document.getElementById(section + 'Content');
  const editDiv = document.getElementById(section + 'Edit');
  if (contentDiv && editDiv) {
    contentDiv.style.display = isEditMode ? 'none' : 'block';
    editDiv.style.display = isEditMode ? 'block' : 'none';
  }
}

// Function to display Overview data
function displayOverview() {
  const overviewContent = document.getElementById('overviewContent');
  overviewContent.innerHTML = `
    <p><strong>Business Name:</strong> ${data.business_name}</p>
    <p><strong>Business Type:</strong> ${data.business_type}</p>
    <p><strong>Categories:</strong> ${data.categories}</p>
    <p><strong>Description:</strong> ${data.description}</p>
    <p><strong>Status:</strong> ${data.status}</p>
    <p><strong>Business Opened On:</strong> ${data.business_opened_on}</p>
  `;
}

// Function to update Overview data
function updateOverview() {
  data.business_name = document.getElementById('editBusinessName').value;
  data.business_type = document.getElementById('editBusinessType').value;
  data.categories = document.getElementById('editCategories').value;
  data.description = document.getElementById('editDescription').value;
  data.status = document.getElementById('editStatus').value;
  data.business_opened_on = document.getElementById('editOpenedOn').value;

  // Save data to localStorage
  localStorage.setItem('businessData', JSON.stringify(data));

  alert('Overview updated successfully!');
}

// Add event listeners to mode buttons
document.getElementById('editButton').addEventListener('click', () => toggleMode('edit'));
document.getElementById('previewButton').addEventListener('click', () => toggleMode('preview'));

// Initial display
displayOverview();

