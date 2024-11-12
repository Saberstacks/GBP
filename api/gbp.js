// api/gbp.js
const { google } = require('googleapis');
const cookie = require('cookie');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).send('Method not allowed');
    return;
  }

  try {
    // Parse cookies
    const cookies = cookie.parse(req.headers.cookie || '');
    const accessToken = cookies.access_token;

    if (!accessToken) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Initialize the GBP API clients
    const mybusinessaccountmanagement = google.mybusinessaccountmanagement({
      version: 'v1',
      auth: oauth2Client,
    });

    const mybusinessbusinessinformation = google.mybusinessbusinessinformation({
      version: 'v1',
      auth: oauth2Client,
    });

    // Get the user's accounts
    const accountsResponse = await mybusinessaccountmanagement.accounts.list();
    const accounts = accountsResponse.data.accounts;

    console.log('Accounts:', accounts);

    if (!accounts || accounts.length === 0) {
      res.status(200).json({ noGbp: true, message: 'No Google Business Profiles found.' });
      return;
    }

    const accountName = accounts[0].name; // e.g., 'accounts/1234567890'

    // Get locations for the account
    const locationsResponse = await mybusinessbusinessinformation.accounts.locations.list({
      parent: accountName,
    });
    const locations = locationsResponse.data.locations;

    console.log('Locations:', locations);

    if (!locations || locations.length === 0) {
      res.status(200).json({ noGbp: true, message: 'No locations found for your account.' });
      return;
    }

    res.status(200).json({ locations });
  } catch (error) {
    console.error('Error fetching GBP data:', error);

    // Return detailed error message for debugging (remove in production)
    res.status(500).json({ error: 'Failed to fetch GBP data', details: error.message });
  }
};
