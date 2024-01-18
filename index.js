const express = require('express')
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const logger = require('morgan')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()

const axios = require('axios')

app.use(logger('tiny', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' })
}));

app.use(bodyParser.json())

const PORT = 3333

// products route
app.use('/products', productRoutes)

// user route
app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to node project api endpoint'
    })
})

// test endpoint
app.get('/test', (req, res) => {

    axios.get('https://www.google.com/search?q=harddisk')
        .then((response) => {
            let { data } = response
            res.send(data)
        })
        .catch((error) => {
            res.status(404).send('Something went wrong')
        })
})

app.listen(PORT, () => {
    console.log('Server running at port 3333')
})