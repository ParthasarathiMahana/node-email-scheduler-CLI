const CustomEvents = require('./eventHandler')
const scheduleEmail = require('./emailScheduler')
const fs = require('fs')

console.log('🙏 Welcome, Please enter the below data to scedule your email.')

const customEventObject = new CustomEvents()
customEventObject.getUserInput()

customEventObject.addListener('getUserInput', (data)=>{
    customEventObject.appendData(data)
})

customEventObject.addListener('addEmailDetails', ({filePath})=>{
    console.log("Email details appended, here is the file path", filePath);
    scheduleEmail(filePath)
})