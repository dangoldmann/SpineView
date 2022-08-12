const express = require('express')
const app = express();

// middleware
app.use(express.json())

//routes
app.use('/api/users', require('./routes/users'))
app.use('/api/x-rays', require('./routes/x-rays'))

// starting the server
app.listen(3000, () => console.log(`Listening on port 3000...`))
