const express = require("express"); // import express
const { notFound, errorHandler } = require ('./middleware/errorMiddleware') // import error middle ware
const connectDB = require("./config/db"); //added config
const cors = require("cors"); //added cors
const app = express(); //express server
const session = require('express-session')
const bodyParser = require('body-parser') // import body parser

require ('dotenv').config() // loads the variables from env file
const passport = require('passport')


//app.use(passport.session()) // calls serializeUser and deserializeUser
app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session())

app.use(bodyParser.json()); // this is used to create the req body mode 

//api routes
const treatments= require ('./routes/treatment') 
const user = require('./routes/user')   
const booking =require('./routes/booking')
//const social = require('./routes/social')

//cors added
app.use(cors())

app.use(bodyParser.urlencoded({
    extended: false
}));

// connect database

connectDB(); //added
//apis
app.use("/api/users", user)
app.use("/api/treatments", treatments)
app.use("/api/bookings", booking)
//app.use("/api/social", social)


//handle errors
app.use(notFound)
app.use(errorHandler)



app.use(cors({
    origin: true,
    credentials: true
}));

// initialize middleware
app.use(express.json({
    extended: false
}));
app.get("/", (req, res) => res.send("Server up and running"));

/*app.use(
  session({
  secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
  })
)*/



app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}); 



/*app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});*/


//app.use(errorHandler);



// setting up port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is listening on 5000 `);
})

module.exports = app