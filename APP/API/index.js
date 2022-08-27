//#region dependencies
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const {router: userRoutes, basePath: userBasePath} = require('./routes/users')
//#endregion

// creating the express aplication
const app = express();

// middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(cookieParser()) 
app.use(session({
    name: 'sid',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true
    },
    secret: "Secret",
    resave: false,
    saveUninitialized: false
}))

//routes
app.use(userBasePath, userRoutes)
app.use('/api/radiographies', require('./routes/radiographies'))

const users = [
    {id:1, name: 'Dan', email: 'dan@gmail.com', password: 'secret'},
    {id:2, name:'Polo', email: 'polo@gmail.com', password: 'secret'}
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
    req.session.destroy(err => {
        if(err) return res.redirect('/home')

        res.clearCookie('sid')
        res.redirect('/login')
    })
})

app.post('/login', redirectHome, (req, res) => {
    const {email, password} = req.body

    if(email && password)
    {
        const user = users.find(user => user.email === email && user.password === password)

        if(user)
        {
            req.session.userId = user.id
            return res.redirect('/home')
        }
    }

    res.redirect('/login')
})

app.post('/register', redirectHome, (req, res) => {
    const {name, email, password} = req.body

    if(name && email && password)
    {
        const exists = users.some(user => user.email === email)

        if(!exists)
        {
            const user = {
                id: users.length+1,
                name,
                email,
                password
            }

            users.push(user)

            req.session.userId = user.id

            return res.redirect('/home')
        }
    }

    res.redirect('/register')
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
