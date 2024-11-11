const path = require('path')
require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
// Require Provider 
// const lti = require('ltijs').Provider

// // Setup provider
// lti.setup(process.env.LTI_TOKEN, // Key used to sign cookies and tokens
//   { // Database configuration
//     url: 'mongodb+srv://sandeep:maharjan@canvas.xdlpt.mongodb.net/',
//     //connection: { user: 'user', pass: 'password' }
//   },
//   { // Options
//     appRoute: '/', loginRoute: '/login', // Optionally, specify some of the reserved routes
//     cookies: {
//       secure: false, // Set secure to true if the testing platform is in a different domain and https is being used
//       sameSite: '' // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
//     },
//     devMode: true // Set DevMode to false if running in a production environment with https
//   }
// )

// // Set lti launch callback
// lti.onConnect((token, req, res) => {
//   console.log(token)
//   return res.send('It\'s alive!')
// })

// const setup = async () => {
//   // Deploy server and open connection to the database
//   await lti.deploy({ port: 3000 }) // Specifying port. Defaults to 3000

//   // Register platform
//   // await lti.registerPlatform({
//   //   url: 'https://lti-ri.imsglobal.org/lti/tools/5154/deep_link_launches',
//   //   name: 'Sandeep nov 10',
//   //   clientId: 'abcdef',
//   //   authenticationEndpoint: 'https://lti-ri.imsglobal.org/platforms/5341/authorizations/new',
//   //   accesstokenEndpoint: 'https://lti-ri.imsglobal.org/platforms/5341/access_tokens',
//   //   authConfig: { method: 'PUBLIC_KEY', key: '-----BEGIN PUBLIC KEY----- MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy1l9Odr7FwZHJwpxPaca rNdqPmfL9JUlTZ7nclk22Qi2TGFWngMzTErQFQ/VgsNBN4pjLJke08x9P7mG7cE2 L35qazUfwB/r+Kdl/rq4dKQ5UxN9zsJLEGVVzgV34cayjuDtNZAzWR1NZCM2ZAXK u2Q08u6eHdaa+DDiMwHMzSFBAPUjiIJ/H1vsK1iU1eqtFH5N5fJ9M1nVYi5sgCTi XnRm6ObQF4mT3PZeiupn1yXc8vdLflV5t5C3gO8JX1Nz4nqfh1TL2ofHFjscH3Zg RiobKs/bxzbUPikwiRDLXc2GadaXI2xiVhPta2wB0cQN1Sa228r4xLOqOnpQbHrV NwIDAQAB -----END PUBLIC KEY-----' }
//   // })
// }

// setup()

// Import required modules
const express = require('express');
const lti = require('ltijs').Provider;

const app = express();

// Step 3: Setup LTI provider and server
// Set up LTI provider with basic configuration
lti.setup(process.env.LTI_TOKEN, // LTI key
  { 
    url: 'mongodb+srv://sandeep:maharjan@canvas.xdlpt.mongodb.net/', // MongoDB URL
    connection: { useNewUrlParser: true, useUnifiedTopology: true } 
  }, 
  {
    staticPath: '/public', 
    devMode: true // Enable development mode
  }
);

// Step 4: Register the platform
(async () => {
  // await lti.deploy({ serverless: true });

  // Register IMS platform with public key authentication
  // await lti.registerPlatform({
  //   url: 'https://lti-ri.imsglobal.org/lti/tools/5154/deep_link_launches',
  //   name: 'Sandeep nov 10',
  //   clientId: 'abcdef', // Replace with actual clientId
  //   authenticationEndpoint: 'https://lti-ri.imsglobal.org/platforms/5341/authorizations/new',
  //   accesstokenEndpoint: 'https://lti-ri.imsglobal.org/platforms/5341/access_tokens',
  //   authConfig: { 
  //     method: 'RSA_KEY',
  //     key: `-----BEGIN RSA PRIVATE KEY----- MIIEowIBAAKCAQEAzmbo3FW4uj24QW9hNMoc0Y7HXrkctdVypj9x6qNq5vFdJ0la WeaInH/3x8Yn2VBn9maSHq8fPdzZMCbfBtgHXtQ6kzkxNn9A3OSJsEwfvRHu6CBq +oYS1l9Kta4EZUym98j7HyZg9PF5JPuXGFbrK4off5HBHXUxpqVk699lt0l2i7lk f2LcTF6q69M2Il3WIcapll8BMWC+c86+VcbA7mWUzpm9ZW00ngRn0LvpmcR0NRiw f9yDAK2b364ZxPMPqRJFG6Z8cvb1U0U7EPxk0EascnVZoTkJcinrBcuIgl/IYtSX xsn8jjcMnlrKJNeVqRQYIuO7zLCxjqxNu/V+jQIDAQABAoIBAGfA821O6f006Vp7 UrHmp3Xv/+htxTDiiy9m1SzN2P8edWU6SmDGsgV5jmSuB3oGITyLcwhZn6rJSaQa 5iHallnk9UzsgwCSF1jyyQQGQC4axa2KHjyxCOcaH8QUJcGGNqh4L0QJVtPKTst4 bQufJbhNRmgqLJlSQBM1MPYg5lCrheg2tA74Zxvw1y0jh/terR9EcML4xdxzkSoW NmvtGFfv1FScXAtLLUUVc84K64WovdM6UR4/+t/iRGLA98G6cE9vJELO2B+YSUHA ZW1ojk8gmXdRhDMPjYat11CwrillPl3jo9yxe5H33g8Mr8Q0siYINlucVZ9FRj7D jFSTA0ECgYEA7LmYzOIZ4OlseiTWpefScQfZqg2tn1O1hnKqa2Nn7w9zFs4TJ5yW de8UAb9lQS0pmveEZ7aFMtbSSDgzkgHYuNF/3xFHAK3cvsKzL/zkxGOrlLG8Q5PW M7bpZNGtKnbfw4+qOUx54tF0pux7nlrP1p96nUCc6AixIpHeCBke3/8CgYEA3zU/ FSVU/rWwhNdwhooQvMV9+CQIuByhyb1ypjuTIWeGWijtpsIxcNlwhCEDp2zSBmeK TdFKL/Znyfq9VuDs8S+ac5PcOmIhet6Ter7wvnPzLXMN6mBJV5w0esbEu5a5xeNv +0ISvZSSxx4U5EqOGZehdx/M2QWPneBB8GfJIXMCgYA+bmRCBI9WpbkaLYT+lDkH 3k4lbx4PGwCQyMTxNXI/tg9gQFEE7WMxDzBzlYqaudJzMDwXLifK1KT4rvnK0/nY JEhZCDF1mGTTWn3vdf7PXInv2UARgnfHg8Hh+Pp2bItvBACcw/KRQzREobGofcK6 k6y+tD+tYj11JIsuD5H4+QKBgDFtyC91mfHh6Foyn1+b2YMENRYrXKbw6D8Vrfrz /GwMUetLXv1ryakU7d7EtNtxtLzoVu9OpqAib++BkEZZ/v6WLRzlJILlUka0XXJ0 MDns0XBCJ1W8xuEY3WJG/DASe8c/y3+XrTDAYxSnK7c2b2tpcb9AkouIuLocfF2x jg/TAoGBAMa2zYXmshu84IhbkN1VYoDHJK4rRZbScAR++BweMIMCQ+R0GiF784f7 j9UqVnbhQP6m6aadxc0rM8jCZ8Oa0xYaySkrDG4KWUKqA1AbTE8NRnixelRPop1l mU/nq9pUifsUXtJwfrL9ZuG/xeYVYajD6ouFUDdFVYvC9SWwMGSs -----END RSA PRIVATE KEY-----` // Replace with the actual public key from the IMS platform
  //   }
  // });
  const port = process.env.PORT || 3000;
  await lti.deploy(port, () => {
    console.log(`LTI tool provider is running on port ${port}`);
  });
  // Step 5: Define the main LTI launch route
  lti.onConnect(async (token, req, res) => {
    // Handle the LTI launch and render the tool’s main interface
    console.log(res.locals.token);
    return lti.redirect(res, '/main'); // Redirect to main route after successful connection
  });

  // Start server

})();

// Step 6: Define main route for the LTI tool's interface
app.get('/main', (req, res) => {
  console.log("sadsa");
  res.send('<h1>Welcome to the LTI Tool!</h1>');
});
