// api/auth.js
const { google } = require('googleapis');
const cookie = require('cookie');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { code } = req.query;

    if (!code) {
      console.error('Authorization code not found in query parameters.');
      res.status(400).send('Missing authorization code');
      return;
    }

    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'https://gbp-index.vercel.app/api/auth'
      );

      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Set tokens in secure HTTP-only cookies
      res.setHeader('Set-Cookie', [
        cookie.serialize('access_token', tokens.access_token, {
          httpOnly: true,
          secure: true,
          path: '/',
          sameSite: 'lax',
          domain: 'gbp-index.vercel.app',
        }),
        cookie.serialize('refresh_token', tokens.refresh_token, {
          httpOnly: true,
          secure: true,
          path: '/',
          sameSite: 'lax',
          domain: 'gbp-index.vercel.app',
        }),
      ]);

      // Redirect to the index page
      res.writeHead(302, { Location: '/' });
      res.end();
    } catch (error) {
      console.error('Error exchanging authorization code:', error);
      res.status(500).send('Authentication failed');
    }
  } else {
    res.status(405).send('Method not allowed');
  }
};
