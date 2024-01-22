const express = require('express')
const productRoutes = require('./routes/products')
const userRoutes = require('./routes/user')
const logger = require('morgan')
const fs = require('fs')
const bodyParser = require('body-parser')

const pool = require('./db')

const app = express()

app.use(
  logger('tiny', {
    stream: fs.createWriteStream('./access.log', { flags: 'a' }),
  }),
)

app.use(bodyParser.json())

const PORT = 3333

// products route
app.use('/products', productRoutes)

// user route
app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to node project api endpoint',
  })
})

// test endpoint
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users')
    console.log(result.rows)
    res.send(result.rows)
  } catch (e) {
    console.log('Unable to query the db')
  }
})


app.listen(PORT, () => {
  console.log('Server running at port 3333')
})
