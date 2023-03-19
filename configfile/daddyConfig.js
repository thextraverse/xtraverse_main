const fetch = require('node-fetch');

// Replace with your own credentials
const apiKey = 'gHVSfZC1hSxU_MsnZu6HPgWYiDLNSkQnhvD';
const apiSecret = 'BUizyPQKNswqrzGUUpsFu3';

// Get authorization token
const getAuthorizationToken = async () => {
  const response = await fetch('https://api.godaddy.com/v1/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: apiKey,
      client_secret: apiSecret,
      scope: 'https://api.godaddy.com/roles/domains',
    }),
  });
  const data = await response.json();
  return data.access_token;
};
