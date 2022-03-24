// Setup empty JS object to act as endpoint for all routes
projectData = {};
port = process.env.PORT || 3000


// Require Express to run server and routes
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-Parser');
const { get } = require('http');

// Start up an instance of app

const app = express()



/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


app.get("/getWeather", (req, res) => {
    res.send(projectData)
})

app.post("/getWeather", (req, res) => {
    projectData = { ...req.body }
    res.end()

})

// Setup Server
app.listen(port, () => {
    console.log(`server is runing on port :${port}`)
})