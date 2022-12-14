const express = require('express')
const app = express()
const mongoose = require("mongoose");

// port
const port = process.env.PORT || 4000;

// routes
const admin = require("./routes/admin");
const auth = require("./routes/auth");
const user = require("./routes/user");

// config
const Keys = require("./config/Keys");

//CORS
const cors=require("cors");
const corsOptions ={
    origin: Keys.CORS_URL,
    credentials:true,
    //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
app.use(cors(corsOptions))

// BodyParser middleware
const bodyParser = require("express");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
    Keys.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send('Surge Global Assignment - Backend')
})

// Rotes
app.use("/admin", admin);
app.use("/auth", auth);
app.use("/user", user);

// App Listen
app.listen(port, () => {
    console.log('App started')
})