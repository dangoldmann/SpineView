// dependencies
const express = require('express')
const app = express();
const {router: userRoutes, basePath: userBasePath} = require('./routes/users')
const {router: radiographyRoutes, basePath: radiographyBasePath} = require('./routes/radiographies')
const cors = require('cors')

// middleware
app.use(express.json())
app.use(cors())

//routes
app.use(userBasePath, userRoutes)
app.use(radiographyBasePath, radiographyRoutes)

// starting the server
app.listen(3000, () => console.log(`Listening on port 3000...`))
