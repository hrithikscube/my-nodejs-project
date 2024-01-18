const express = require('express')
const axios = require('axios')

const productsRouter = express.Router()

productsRouter.get('/', (req, res) => {
    console.log(req.query)
    axios.get('https://dummyjson.com/products')
        .then((response) => {
            let { data } = response
            res.json(data.products.slice(1, 6))
        })
        .catch((error) => {
            console.log('Something went wrong', error)
            res.json(error)
        })
})

productsRouter.post('/', (req, res) => {
    const { id, title, description, price } = req.body;
    console.log(req.body)
    res.send({
        message: `Product added successfully`,
    })
})

module.exports = productsRouter