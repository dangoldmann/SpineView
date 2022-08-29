// dependencies
const express = require('express')
const app = express();
const fs = require('fs')
const session = require('express-session')
const {router: userRoutes, basePath: userBasePath} = require('./routes/users')
const {router: radiographyRoutes, basePath: radiographyBasePath} = require('./routes/radiographies')
<<<<<<< Updated upstream
=======
const {router: dataRoutes, basePath: dataBasePath} = require('./receiveData')
//#endregion

// creating the express aplication
const app = express();
>>>>>>> Stashed changes

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
app.use(session({
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: true
    },
    secret: "Secret",
    resave: true,
    saveUninitialized: true
}))

//routes
app.use(userBasePath, userRoutes)
app.use(radiographyBasePath, radiographyRoutes)
app.use(dataBasePath, dataRoutes)

app.post('/getSession', async (req, res) => {
    if(req.sessionID && req.session.user){
        res.status(200)
        return res.send({user: req.session.user})
    }
    return res.sendStatus(403)
})

const redirectLogin = (req, res, next) => {
    if(!req.session.user.id){
        res.redirect('/login')
    }
    else{
        next()
    }
}

const redirectHome = (req, res, next) => {
    if(req.session.user.id){
        console.log('home')
        res.redirect('/home')
    }
    else {
        next()
    }
}

app.get('/', (req, res) => {
    const { id } = req.session.user
    console.log(id)
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
    res.sendStatus(req.session.user.id)
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
