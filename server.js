const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app= express();

app.use(cors())
app.use(bodyParser.json());

app.get('/' , (req,res) =>{
    res.send('Server is Hosted')
})

app.listen(5000 ,() =>{
    console.log("server is running 5000")
})