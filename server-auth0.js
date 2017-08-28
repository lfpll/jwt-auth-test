const express = require('express');
const app = express();
// Import the required dependencies
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://lfpll.auth0.com/.well-known/jwks.json"
  }),
  // This is the identifier we set when we created the API
  audience: 'https://lfpll.auth0.com/userinfo',
  issuer: "https://lfpll.auth0.com/",
  algorithms: ['RS256']
});
