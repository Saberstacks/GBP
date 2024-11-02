// api/auth.js
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('1039601440969-6ca4vofk0c57p7hot5o759r5fcgvkfqe.apps.googleusercontent.com');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'Missing credential parameter' });
    }

    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: '1039601440969-6ca4vofk0c57p7hot5o759r5fcgvkfqe.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();

      // Optionally, you can check if the user is authorized to access your app
      // For example, check if the user's email is in an allowed list

      // Set a cookie to keep the user authenticated
      res.setHeader('Set-Cookie', `token=${credential}; Path=/; HttpOnly`);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error verifying ID token:', error);
      res.status(401).json({ error: 'Invalid ID token' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
