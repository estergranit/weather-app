const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routs=require('./routs/api')
const mongoose=require('mongoose')
const dotenv=require("dotenv")
dotenv.config()
app.use(bodyParser.json())
//routs.use(bodyParser.json)//?
app.use(routs)


app.listen('3000', () => {
    console.log("listen")
})
app.get('/',(req,res)=>{
    res.send('welcome')
})
// app.get('/r',(req,res)=>{
//     res.send('r')
// })
mongoose.connect(process.env.DB_CONNECT).then(()=>{
    console.log("conenct")
}).catch(err=>{console.log(err.message)})
