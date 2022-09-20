require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors')
const apiErrorHandler = require('./error/api-error-handler');
const ApiError = require('./error/ApiError');
const {router: userRoutes, basePath: userBasePath} = require('./routes/users')
const {router: radiographyRoutes, basePath: radiographyBasePath} = require('./routes/radiographies')

// middleware
app.use(express.json())
app.use(cors())

//routes
app.use(userBasePath, userRoutes)
app.use(radiographyBasePath, radiographyRoutes)

app.use((req, res, next) => {
    const error = new ApiError(404, 'Not found')
    next(error)
})

app.use(apiErrorHandler)

// starting the server
app.listen(3000, () => console.log(`Listening on port 3000...`))
