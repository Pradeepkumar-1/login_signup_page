const http = require("http")

const express = require("express")
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const bodyparser=require('body-parser')
let app = express();
app.use(bodyparser.urlencoded())
app.use(cors());
app.use(express.json())


mongoose.connect('mongodb://127.0.0.1:27017/login-signup').then(() => {
    console.log("DB is created");
}).catch((err) => {
    console.log({ message: err.message });
})

const sign_login_schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const signup_login_model = mongoose.model('User', sign_login_schema);


app.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const newuser = new signup_login_model({ username, email, password });
        await newuser.save();
        res.status(201).json(newuser);

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }


})

// app.get('/',)
app.use(express.static(path.join(__dirname, '../frontend/build')));
const router_signup = require('./routes/login_signup');

app.use(router_signup);

app.post('/', async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email,password);

    try {
        const users_data = await signup_login_model.findOne({ email });
        console.log(users_data);
        if (!users_data) {
            res.status(400).json({ message: "User not found" });
        }
        if (users_data.password !== password) {
            res.status(400).json({ message: "Incorrect password" })
        }
        if (users_data) {
            res.json(users_data);
        }
    }
    catch (err) {
        console.log({ message: err.message });
    }
})




app.listen('5002');

