//#region dependencies
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
//#endregion

// creating the express aplication
const app = express();

// middleware
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
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

const users = [
    {id:1, name: 'Dan', password: 'secret'},
    {id:2, name:'Polo', password: 'secret'}
]

const redirectLogin = (req, res, next) => {
    if(!req.session.userId){
        res.redirect('/login')
    }
    else{
        next()
    }
}

const redirectHome = (req, res, next) => {
    if(req.session.userId){
        res.redirect('/home')
    }
    else {
        next()
    }
}

app.get('/', (req, res) => {
    const { userId } = req.session
    console.log(userId)
    if(req.session.page_views){
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } 
    else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
})

app.get('/login', redirectHome, (req, res) => {
    res.send('Login')
})

app.get('/register', redirectHome, (req, res) => {
    res.send('Register')
})

app.get('/home', redirectLogin, (req, res) => {
    res.send(req.session.userId)
})

app.get('/logout', redirectLogin, (req, res) => {
    res.send('Logout')
})

// starting the server
app.listen(3000, () => console.log(`Listening on port 3000...`))

module.exports = {
    redirectHome: (req, res, next) => {
    if(req.session.userId){
        res.redirect('/home')
    }
    else {
        next()
    }
}
}
