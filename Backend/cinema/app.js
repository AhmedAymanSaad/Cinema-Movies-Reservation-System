const express = require('express');
const routes = require('./routes')
var cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:8080',    
    allowedHeaders: ['x-auth-token'],
    exposedHeaders: ['x-auth-token'],
    preflightContinue: true,
    optionsSuccessStatus: 200 // For legacy browser support
}



const app = express();
app.use(express.json());
app.options('*', cors())
app.use(cors(corsOptions));

app.use('/api',routes);

module.exports = app;