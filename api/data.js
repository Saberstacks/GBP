// api/data.js

const { google } = require('googleapis');
const cookie = require('cookie');
const mockData = require('../assets/mockData.json');

module.exports = async (req, res) => {
  // Parse cookies
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: token });

  const mybusinessbusinessinformation = google.mybusinessbusinessinformation({
    version: 'v1',
    auth: oauth2Client,
  });

  try {
    // Attempt to fetch data from GBP API
    const response = await mybusinessbusinessinformation.accounts.locations.list({
      parent: 'accounts', // Modify as needed when you have an account ID
    });

    const data = response.data;

    // If data is empty, use mock data
    if (!data || !data.locations || data.locations.length === 0) {
      res.json(mockData);
    } else {
      // Transform data as needed to match your frontend expectations
      res.json(data);
    }
  } catch (error) {
    console.error('Error fetching data from GBP API:', error);
    // Return mock data in case of error
    res.json(mockData);
  }
};
