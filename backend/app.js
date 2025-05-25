const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes')

connectToDB();

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRoutes);

module.exports = app;