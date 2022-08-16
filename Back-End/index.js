const { response } = require('express');
const express = require('express')
const app = express();
const fs = require('fs')

// middleware
app.use(express.json())

//routes
app.use('/api/users', require('./routes/users'))
app.use('/api/x-rays', require('./routes/x-rays'))

app.get('/', (req, res) => {
    res.writeHead(200, {"Content-Type" : "text/html"})
    fs.readFile('../Front-End/Pruebas HTML y CSS/Landing.html', null, function(err, data) {
        if(err) 
        {
            res.writeHead(404)
            res.write('File not found')
        }
        else
        {
            res.write(data)
        }
        res.end()
    })

})

// starting the server
app.listen(3000, () => console.log(`Listening on port 3000...`))
