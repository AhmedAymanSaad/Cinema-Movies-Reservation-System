const mongoose = require('mongoose');
const app = require('./app');
const config = require('config');
// $env:cinema_jwtPrivateKey="mySecureKey"   ---command to set environment variable 
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
  }
  

mongoose.connect('mongodb://localhost/cinema')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.error('could not connect to MongoDB', err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
//404 not found
// 400 bad request



