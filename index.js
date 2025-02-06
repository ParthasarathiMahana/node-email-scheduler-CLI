const CustomEvents = require('./eventHandler')

const customEventObject = new CustomEvents()
customEventObject.getUserInput()

customEventObject.addListener('getUserInput', (data)=>{
    customEventObject.appendData(data)
})

customEventObject.addListener('addEmailDetails', ({filePath})=>{
    console.log('file path is: ', filePath);
})