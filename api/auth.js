// api/auth.js
const { google } = require('googleapis');
const querystring = require('querystring');
const cookie = require('cookie');

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    const { code, state } = req.query;

    if (!code) {
      res.status(400).send('Missing authorization code');
      return;
    }

    try {
      const oauth2Client = new google.auth.OAuth2(
        '1039601440969-6ca4vofk0c57p7hot5o759r5fcgvkfqe.apps.googleusercontent.com',
        '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',
        'https://gbp-index.vercel.app/login.html'
      );

      const { tokens } = await oauth2Client.getToken(code);
      oauth2Client.setCredentials(tokens);

      // Set tokens in a secure HTTP-only cookie
      res.setHeader('Set-Cookie', [
        cookie.serialize('access_token', tokens.access_token, {
          httpOnly: true,
          secure: true,
          path: '/',
          sameSite: 'lax',
        }),
        cookie.serialize('refresh_token', tokens.refresh_token, {
          httpOnly: true,
          secure: true,
          path: '/',
          sameSite: 'lax',
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
