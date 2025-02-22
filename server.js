const express = require('express')
const server = express()
const customEvents = require('./eventHandler')
const scheduleEmail = require('./emailScheduler')


server.use(express.json({}))
server.use(express.urlencoded({extended:true}))

const eventHandlerObject = new customEvents()

server.get('/', (req, res, next)=>{
    res.json({
        'message':"Welcome to my Email scheduler app. hit this /list-all-api to get a list of api end points which can help you with your email scheduling."
    })
})

server.get('/list-all-api', (req, res, next)=>{
    res.json({
        "enter the details to schedule an email":"/schedule-email"
    })
})

server.post('/schedule-email', (req, res, next)=>{
    let {toEmail, subject, body, time} = req.body;
    if(!toEmail || !subject || !body || !time){
        return res.status(400).json({"message":"All fields are required to schedule the email."})
    }
    eventHandlerObject.appendData({toEmail, subject, body, time})
    return res.status(200).json({"message":"Your email is scheduled, here are the info: ", toEmail, subject, body, time})
})

eventHandlerObject.addListener('addEmailDetails', ({filePath})=>{
    console.log("Email details appended, here is the file path", filePath);
    scheduleEmail(filePath)
})

server.listen(3000, (err)=>{
    if(err){
        return console.log("Error occured while starting the server. \n", err);
    }

    console.log('Server is up and running on port number: ', 3000)
})