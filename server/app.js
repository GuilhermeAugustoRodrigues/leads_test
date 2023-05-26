const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const responses = require('./src/responses/loader');
const router = require('./src/router');

// Init models
require('./src/models/loader');

// Uses
const app = express();
app.use(cors());
app.use(responses);
app.use(bodyParser.json());

// Int routes
router(app);

// Listen server
if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
  module.exports = app;
} else {
  const server = app.listen(3000, () => {
    console.log('App listening at port %s', server.address().port);
  });
}
