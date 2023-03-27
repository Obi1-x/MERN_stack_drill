require('dotenv').config();  // To access the .env file.

const express = require('express'); //returns a function
const app = express(); //Returns an object of type Express
const mongoose = require('mongoose');

mongoose.set('strictQuery', false); //true to supress what ever error that might arise, false to prep for deprecation.
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
 

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Connected to database"));

app.use(express.json()); //Allows our server to accept JSON parsing as a body in POST command or so.

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter); //Used whenever we query subscribers url (e.g localhost:3000/subscribers/id)

//mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});

const port = process.env.PORT || 6061;
app.listen(port, () => console.log(`Server started at ${port}`));