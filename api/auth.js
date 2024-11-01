// api/auth.js

const { google } = require('googleapis');
const cookie = require('cookie');

module.exports = async (req, res) => {
  const { query } = req;
  const code = query.code;

  if (!code) {
    res.status(400).send('Missing code parameter');
    return;
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${req.headers.origin}/api/auth`
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);

    // Set the token in an HTTP-only cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', tokens.access_token, {
      httpOnly: true,
      secure: true,
      maxAge: tokens.expires_in,
      path: '/',
    }));

    // Redirect to the dashboard
    res.writeHead(302, { Location: '/' });
    res.end();
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Authentication failed');
  }
};
