// lti-server.js
const path = require('path');
const express = require('express');
const axios = require('axios');
// const { Provider } = require('ltijs');
require("dotenv").config({
    path: path.join(__dirname, ".env"),
  });
const port = process.env.PORT;
const lti = require('ltijs').Provider;
const app = express();


// LTI Setup
// const lti = new Provider('EXAMPLE_KEY', 'DATABASE_URL');

// Initialize LTI
lti.setup(process.env.LTI_KEY,{
  url: `mongodb+srv://sandeep:maharjan@canvas.xdlpt.mongodb.net/`, // Database URL
  connection: { useNewUrlParser: true, useUnifiedTopology: true } 
});

//enable cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });

// Define routes for LTI launch
lti.onConnect(async (token, req, res) => {
    console.log("here ");
  const idToken = token.idToken;

  // Get the user's access token from the ID token
  const accessToken = idToken.custom.canvas_api_token;

  // Use accessToken to make a request to Canvas API
  const canvasDomain = 'https://canvas.instructure.com/api/v1'; // Replace with your Canvas domain

  try {
    // Example: Get user profile information
    const profileResponse = await axios.get(`${canvasDomain}/users/self/profile`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    // Render a simple HTML page showing the user profile info
    res.send(`
      <h1>Hello, ${profileResponse.data.name}!</h1>
      <p>Email: ${profileResponse.data.primary_email}</p>
      <p>Bio: ${profileResponse.data.bio || 'N/A'}</p>
    `);
  } catch (error) {
    console.error('Error accessing Canvas API:', error.message);
    res.status(500).send('Failed to fetch data from Canvas.');
  }
});

require("./routes")(app); 
app.get('/main', (req, res) => {
    console.log("sadsa");
    res.send('<h1>Welcome to the LTI Tool!</h1>');
  });

// Start LTI provider server
// lti.deploy({ serverless: true, expressApp: app })
//   .then(() => app.listen(port, () => console.log(`LTI server running on port ${port}`)))
//   .catch(err => console.error('LTI deployment failed:', err));


const setup = async () => {
    await lti.deploy({ serverless: true, expressApp: app })
      .then(() => app.listen(port, () => console.log(`LTI server running on port ${port}`)))
      .catch(err => console.error('LTI deployment failed:', err));
  
    /**
     * Register platform
     */
    await lti.registerPlatform({
      url: 'https://canvas.instructure.com',
      name: 'Org Name 1',
      clientId: 'TOOLCLIENTID1',
      authenticationEndpoint: 'https://canvas.instructure.com/api/lti/authorize_redirect',
      accesstokenEndpoint: 'https://canvas.instructure.com/login/oauth2/token',
      authConfig: { method: 'JWK_SET', key: 'https://canvas.instructure.com/api/lti/security/jwks' }
    })
  }
  
  setup()