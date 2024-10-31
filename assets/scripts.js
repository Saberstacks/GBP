// assets/scripts.js

document.addEventListener('DOMContentLoaded', () => {
  // Data Object
  let data = {
    // Overview Data
    business_name: "Sunshine Bakery",
    business_type: "Bakery",
    categories: "Bakery, Cafe, Dessert Shop",
    description: "Sunshine Bakery offers fresh, homemade pastries, cakes, and seasonal treats. Enjoy a cozy atmosphere with locally sourced coffee and gluten-free options available.",
    status: "Open",
    business_opened_on: "2010-05-14",

    // Location Data
    formatted_address: "123 Main St, Springfield, IL 62701, USA",
    street_address: "123 Main St",
    city: "Springfield",
    state: "IL",
    postal_code: "62701",
    country: "USA",
    latitude: "39.7817",
    longitude: "-89.6501",
    service_areas: "Springfield, IL; Chatham, IL; Decatur, IL",

    // Contact Data
    phone_number: "+1 217-555-1234",
    website: "www.sunshinebakery.com",
    email: "info@sunshinebakery.com",
    booking_link: "Book a Reservation",

    // Hours Data
    mon_thu: "07:00 - 18:00",
    friday: "07:00 - 20:00",
    saturday: "08:00 - 16:00",
    sunday: "Closed",
    thanksgiving: "08:00 - 14:00",
    christmas: "Closed",

    // Offers Data
    offers: [
      "Buy One Get One Free on select pastries (valid until 2024-11-01)",
      "20% off coffee for students (valid until 2024-12-31)"
    ],

    // Products Data
    products: [
      "Chocolate Croissant: $3.50 USD",
      "Pumpkin Spice Latte (Limited): $5.00 USD"
    ],
    attributes: [
      "Wheelchair Accessible: Yes",
      "Family Friendly: Yes",
      "Pet Friendly: No",
      "Payment Options: Cash, Credit Card, Mobile Payment",
      "Delivery: Yes",
      "Online Orders: Yes"
    ],

    // Reviews Data
    reviews: [
      'John Doe - 5 stars\n"Amazing pastries!"',
      'Jane Smith - 3 stars\n"Coffee was okay but overpriced."'
    ],

    // Q&A Data
    qa: [
      "Q: Gluten-free options?\nA: Yes",
      "Q: Outdoor seating?\nA: Yes"
    ],

    // Posts Data
    posts: [
      '"Pumpkin spice is back!" (Valid until 2024-11-01)',
      '"Live music this Friday evening!" (Expired 2024-10-27)'
    ],

    // Insights Data
    views: 1450,
    direct_queries: 500,
    discovery_queries: 850,
    branded_queries: 100,
    website_visits: 300,
    phone_calls: 45,
    request_directions: 120
  };

  // Load data from localStorage if available
  if (localStorage.getItem('businessData')) {
    data = JSON.parse(localStorage.getItem('businessData'));
  }

  // Function to display data in Preview mode
  function displayData() {
    // Overview
    document.getElementById('displayBusinessName').textContent = data.business_name;
    document.getElementById('displayBusinessType').textContent = data.business_type;
    document.getElementById('displayCategories').textContent = data.categories;
    document.getElementById('displayDescription').textContent = data.description;
    document.getElementById('displayStatus').textContent = data.status;
    document.getElementById('displayOpenedOn').textContent = data.business_opened_on;

    // Update header section
    document.getElementById('businessTitle').textContent = data.business_name;
    document.getElementById('businessDescription').textContent = data.description;

    // Location
    document.getElementById('displayFormattedAddress').textContent = data.formatted_address;
    document.getElementById('displayStreetAddress').textContent = data.street_address;
    document.getElementById('displayCity').textContent = data.city;
    document.getElementById('displayState').textContent = data.state;
    document.getElementById('displayPostalCode').textContent = data.postal_code;
    document.getElementById('displayCountry').textContent = data.country;
    document.getElementById('displayLatitude').textContent = data.latitude;
    document.getElementById('displayLongitude').textContent = data.longitude;
    document.getElementById('displayServiceAreas').textContent = data.service_areas;

    // Contact
    document.getElementById('displayPhoneNumber').textContent = data.phone_number;
    document.getElementById('displayPhoneNumber').href = 'tel:' + data.phone_number;
    document.getElementById('displayWebsite').textContent = data.website;
    document.getElementById('displayWebsite').href = data.website.startsWith('http') ? data.website : 'http://' + data.website;
    document.getElementById('displayEmail').textContent = data.email;
    document.getElementById('displayEmail').href = 'mailto:' + data.email;
    document.getElementById('displayBookingLink').textContent = data.booking_link;

    // Hours
    document.getElementById('displayMonThu').textContent = data.mon_thu;
    document.getElementById('displayFriday').textContent = data.friday;
    document.getElementById('displaySaturday').textContent = data.saturday;
    document.getElementById('displaySunday').textContent = data.sunday;
    document.getElementById('displayThanksgiving').textContent = data.thanksgiving;
    document.getElementById('displayChristmas').textContent = data.christmas;

    // Offers
    const offersList = document.getElementById('displayOffers');
    offersList.innerHTML = '';
    data.offers.forEach(offer => {
      const li = document.createElement('li');
      li.textContent = offer;
      offersList.appendChild(li);
    });

    // Products
    const productsList = document.getElementById('displayProducts');
    productsList.innerHTML = '';
    data.products.forEach(product => {
      const li = document.createElement('li');
      li.textContent = product;
      productsList.appendChild(li);
    });

    const attributesList = document.getElementById('displayAttributes');
    attributesList.innerHTML = '';
    data.attributes.forEach(attr => {
      const li = document.createElement('li');
      li.textContent = attr;
      attributesList.appendChild(li);
    });

    // Reviews
    const reviewsDisplay = document.getElementById('reviewsDisplay');
    reviewsDisplay.innerHTML = '';
    data.reviews.forEach(review => {
      const reviewDiv = document.createElement('div');
      reviewDiv.classList.add('review');
      const [header, comment] = review.split('\n');
      reviewDiv.innerHTML = `<p><strong>${header}</strong></p><p>${comment}</p>`;
      reviewsDisplay.appendChild(reviewDiv);
    });

    // Q&A
    const qaDisplay = document.getElementById('qaDisplay');
    qaDisplay.innerHTML = '';
    data.qa.forEach(qaItem => {
      const qaDiv = document.createElement('div');
      qaDiv.classList.add('qa-item');
      const [question, answer] = qaItem.split('\n');
      qaDiv.innerHTML = `<p><strong>${question}</strong></p><p><strong>${answer}</strong></p>`;
      qaDisplay.appendChild(qaDiv);
    });

    // Posts
    const postsDisplay = document.getElementById('postsDisplay');
    postsDisplay.innerHTML = '';
    data.posts.forEach(post => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post-item');
      postDiv.innerHTML = `<p>${post}</p>`;
      postsDisplay.appendChild(postDiv);
    });

    // Insights
    document.getElementById('displayViews').textContent = data.views;
    document.getElementById('displayDirectQueries').textContent = data.direct_queries;
    document.getElementById('displayDiscoveryQueries').textContent = data.discovery_queries;
    document.getElementById('displayBrandedQueries').textContent = data.branded_queries;
    document.getElementById('displayWebsiteVisits').textContent = data.website_visits;
    document.getElementById('displayPhoneCalls').textContent = data.phone_calls;
    document.getElementById('displayRequestDirections').textContent = data.request_directions;
  }

  // Function to populate Edit fields
  function populateEditFields() {
    // Overview
    document.getElementById('editBusinessName').value = data.business_name;
    document.getElementById('editBusinessType').value = data.business_type;
    document.getElementById('editCategories').value = data.categories;
    document.getElementById('editDescription').value = data.description;
    document.getElementById('editStatus').value = data.status;
    document.getElementById('editOpenedOn').value = data.business_opened_on;

    // Location
    document.getElementById('editFormattedAddress').value = data.formatted_address;
    document.getElementById('editStreetAddress').value = data.street_address;
    document.getElementById('editCity').value = data.city;
    document.getElementById('editState').value = data.state;
    document.getElementById('editPostalCode').value = data.postal_code;
    document.getElementById('editCountry').value = data.country;
    document.getElementById('editLatitude').value = data.latitude;
    document.getElementById('editLongitude').value = data.longitude;
    document.getElementById('editServiceAreas').value = data.service_areas;

    // Contact
    document.getElementById('editPhoneNumber').value = data.phone_number;
    document.getElementById('editWebsite').value = data.website;
    document.getElementById('editEmail').value = data.email;
    document.getElementById('editBookingLink').value = data.booking_link;

    // Hours
    document.getElementById('editMonThu').value = data.mon_thu;
    document.getElementById('editFriday').value = data.friday;
    document.getElementById('editSaturday').value = data.saturday;
    document.getElementById('editSunday').value = data.sunday;
    document.getElementById('editThanksgiving').value = data.thanksgiving;
    document.getElementById('editChristmas').value = data.christmas;

    // Offers
    document.getElementById('editOffers').value = data.offers.join('\n');

    // Products
    document.getElementById('editProducts').value = data.products.join('\n');
    document.getElementById('editAttributes').value = data.attributes.join('\n');

    // Reviews
    document.getElementById('editReviews').value = data.reviews.join('\n\n');

    // Q&A
    document.getElementById('editQA').value = data.qa.join('\n\n');

    // Posts
    document.getElementById('editPosts').value = data.posts.join('\n\n');

    // Insights
    document.getElementById('editViews').value = data.views;
    document.getElementById('editDirectQueries').value = data.direct_queries;
    document.getElementById('editDiscoveryQueries').value = data.discovery_queries;
    document.getElementById('editBrandedQueries').value = data.branded_queries;
    document.getElementById('editWebsiteVisits').value = data.website_visits;
    document.getElementById('editPhoneCalls').value = data.phone_calls;
    document.getElementById('editRequestDirections').value = data.request_directions;
  }

  // Function to toggle between Preview and Edit modes
  function toggleMode(isEditMode) {
    // Toggle buttons
    document.getElementById('editButton').disabled = isEditMode;
    document.getElementById('previewButton').disabled = !isEditMode;

    // Sections to toggle
    const sections = ['overview', 'location', 'contact', 'hours', 'offers', 'products', 'reviews', 'qa', 'posts', 'insights'];

    sections.forEach(section => {
      document.getElementById(`${section}Display`).style.display = isEditMode ? 'none' : 'block';
      const editSection = document.getElementById(`${section}Edit`);
      if (editSection) {
        editSection.style.display = isEditMode ? 'block' : 'none';
      }
    });

    if (isEditMode) {
      populateEditFields();
    } else {
      displayData();
    }
  }

  // Update functions for each section
  window.updateOverview = function() {
    data.business_name = document.getElementById('editBusinessName').value;
    data.business_type = document.getElementById('editBusinessType').value;
    data.categories = document.getElementById('editCategories').value;
    data.description = document.getElementById('editDescription').value;
    data.status = document.getElementById('editStatus').value;
    data.business_opened_on = document.getElementById('editOpenedOn').value;

    saveData();
    alert('Overview updated successfully!');
  };

  window.updateLocation = function() {
    data.formatted_address = document.getElementById('editFormattedAddress').value;
    data.street_address = document.getElementById('editStreetAddress').value;
    data.city = document.getElementById('editCity').value;
    data.state = document.getElementById('editState').value;
    data.postal_code = document.getElementById('editPostalCode').value;
    data.country = document.getElementById('editCountry').value;
    data.latitude = document.getElementById('editLatitude').value;
    data.longitude = document.getElementById('editLongitude').value;
    data.service_areas = document.getElementById('editServiceAreas').value;

    saveData();
    alert('Location updated successfully!');
  };

  window.updateContact = function() {
    data.phone_number = document.getElementById('editPhoneNumber').value;
    data.website = document.getElementById('editWebsite').value;
    data.email = document.getElementById('editEmail').value;
    data.booking_link = document.getElementById('editBookingLink').value;

    saveData();
    alert('Contact information updated successfully!');
  };

  window.updateHours = function() {
    data.mon_thu = document.getElementById('editMonThu').value;
    data.friday = document.getElementById('editFriday').value;
    data.saturday = document.getElementById('editSaturday').value;
    data.sunday = document.getElementById('editSunday').value;
    data.thanksgiving = document.getElementById('editThanksgiving').value;
    data.christmas = document.getElementById('editChristmas').value;

    saveData();
    alert('Hours updated successfully!');
  };

  window.updateOffers = function() {
    data.offers = document.getElementById('editOffers').value.split('\n').filter(line => line.trim() !== '');

    saveData();
    alert('Offers updated successfully!');
  };

  window.updateProducts = function() {
    data.products = document.getElementById('editProducts').value.split('\n').filter(line => line.trim() !== '');
    data.attributes = document.getElementById('editAttributes').value.split('\n').filter(line => line.trim() !== '');

    saveData();
    alert('Products and attributes updated successfully!');
  };

  window.updateReviews = function() {
    data.reviews = document.getElementById('editReviews').value.split('\n\n').filter(block => block.trim() !== '');

    saveData();
    alert('Reviews updated successfully!');
  };

  window.updateQA = function() {
    data.qa = document.getElementById('editQA').value.split('\n\n').filter(block => block.trim() !== '');

    saveData();
    alert('Q&A updated successfully!');
  };

  window.updatePosts = function() {
    data.posts = document.getElementById('editPosts').value.split('\n\n').filter(block => block.trim() !== '');

    saveData();
    alert('Posts updated successfully!');
  };

  window.updateInsights = function() {
    data.views = parseInt(document.getElementById('editViews').value) || 0;
    data.direct_queries = parseInt(document.getElementById('editDirectQueries').value) || 0;
    data.discovery_queries = parseInt(document.getElementById('editDiscoveryQueries').value) || 0;
    data.branded_queries = parseInt(document.getElementById('editBrandedQueries').value) || 0;
    data.website_visits = parseInt(document.getElementById('editWebsiteVisits').value) || 0;
    data.phone_calls = parseInt(document.getElementById('editPhoneCalls').value) || 0;
    data.request_directions = parseInt(document.getElementById('editRequestDirections').value) || 0;

    saveData();
    alert('Insights updated successfully!');
  };

  // Function to save data to localStorage
  function saveData() {
    localStorage.setItem('businessData', JSON.stringify(data));
    displayData();
  }

  // Event listeners for mode buttons
  document.getElementById('editButton').addEventListener('click', () => {
    toggleMode(true);
  });

  document.getElementById('previewButton').addEventListener('click', () => {
    toggleMode(false);
  });

  // Initial display
  displayData();
});

