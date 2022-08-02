const express = require('express');
const app = express();

app.use(express.json())

const users = [
    {id:1, name:"Dan"},
    {id:2, name:"Ian"},
    {id:3, name:"Ivo"},
    {id:4, name:"Pancho"}
]

app.get('/api/users', (req, res) => {
    res.json(users)
    //res.send(users)
})

app.get('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id))
    
    if(!user)
    {
        res.status(404).send('User not found')
    }
    
    res.send(user)
})

app.post('/api/users', (req, res) => {
    
    if(!req.body.name || req.body.name.length < 3)
    {
        res.status(404).send('Name is required and should be minimum 3 characters')
        return
    }
     
    const user = {
        id: users.length + 1,
        name: req.body.name
    }
    
    users.push(user)
    res.status(201).send()
})

app.post('/api/users/login', (req, res) => {
    const user = users.find(user => user.name = req.body.name)

    if(user == null)
    {
        return res.status(400).send('Cannot find user')
    }
})

app.put('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id))

    if(!user) res.status(404).send('User not found')

    if(!req.body.name || req.body.name.length < 3)
    {
        res.status(400).send('Name is required and should be minimum 3 characters')
        return
    }

    user.name = req.body.name
    res.send(user)
})

app.delete('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id))
    if(!user) res.status(404).send('User not found')

    const index = users.indexOf(user)
    users.splice(index, 1)

    res.send('The user has been deleted successfully')
})

app.listen(3000, () => console.log(`Listening on port 3000...`))
