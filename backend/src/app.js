const express = require('express');
const cors = require('cors');
const feedbackRoute = require('./routes/feedback');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/feedback', feedbackRoute);

module.exports = app;
