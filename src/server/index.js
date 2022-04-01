var path = require('path')
const express = require('express')
const getTripInfo=require('./handleRequest.js')
const bodyParser = require("body-parser");
const cors = require("cors");
//body parser
const app = express()
// Enable All CORS Requests
app.use(cors());
app.use(express.static('dist'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('dist/index.html'))
})
app.post('/', async function (req, res) {      
     
    
    const trip=await getTripInfo(req.body)
    
    res.send(trip)
    
})
 
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


