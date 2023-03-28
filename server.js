const express = require("express"); // import express
const { notFound, errorHandler } = require ('./middleware/errorMiddleware') // import error middle ware
const connectDB = require("./config/db"); //added config
const cors = require("cors"); //added cors
const app = express(); //express server

const bodyParser = require('body-parser') // import body parser

require ('dotenv').config() // loads the variables from env filw


app.use(bodyParser.json()); // this is used to create the req body mode 

//api routes
const treatments= require ('./routes/treatment') 
const user = require('./routes/user')   
const booking =require('./routes/booking')


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





app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
}); 




//app.use(errorHandler);



// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is listening on 6000 `);
})

module.exports = app