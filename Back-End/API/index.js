//#region dependencies
const express = require('express')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const session = require('express-session')
//#endregion

// creating the express aplication
const app = express();

// middleware
app.use(express.json())
app.use(cookieParser()) 
app.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true
    },
    secret: "Secret",
    resave: false,
    saveUninitialized: false
}))

//routes
app.use('/api/users', require('./routes/users'))
app.use('/api/radiographies', require('./routes/radiographies'))

app.get('/', (req, res) => {
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } 
    else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
})

app.get('/home', (req, res) => {
    res.send('You are in the home page')
})

// starting the server
app.listen(3000, () => console.log(`Listening on port 3000...`))