const express = require('express')
const axios = require('axios')
const userRoutes = express.Router()

userRoutes.get('/', (req, res) => {

    axios.get('https://dummyjson.com/users')
        .then((response) => {
            let { data } = response
            res.status(200).json({ data: data, message: "List of users and their credentials" })
        })
        .catch((error) => {
            res.status(404).json({ message: 'Unable to get list of users' })
        })

})

module.exports = userRoutes