require('dotenv').config()
const path = require('path')
const routes = require('./src/routes')

const lti = require('ltijs').Provider

// Setup
lti.setup(process.env.LTI_KEY,
  {
    url: 'mongodb+srv://'+process.env.MONGODB_USERNAME+':'+process.env.MONGODB_PASSWORD+'@canvas.xdlpt.mongodb.net/',
    connection: { useNewUrlParser: true, useUnifiedTopology: true } 
  },{ appRoute: '/', loginRoute: '/login' })

// When receiving successful LTI launch 
lti.onConnect(async (token, req, res) => {
  try {
    if (!token) throw new Error('Missing LTI token');
    res.send('LTI launch successful!');
  } catch (error) {
    console.error('LTI Launch Error:', error.message);
    res.status(401).json({ status: 401, error: 'Unauthorized', message: error.message });
  }
})

// When receiving deep linking request redirects to deep screen
lti.onDeepLinking(async (token, req, res) => {
  return lti.redirect(res, '/deeplink', { newResource: true })
})

// Setting up routes
lti.app.use(routes)


// Setup function
const setup = async () => {
  console.log(process.env.PORT);
  await lti.deploy({ port: process.env.PORT })

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