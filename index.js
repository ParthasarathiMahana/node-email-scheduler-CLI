const CustomEvents = require('./eventHandler')

const customEventObject = new CustomEvents()
customEventObject.getUserInput()

customEventObject.addListener('getUserInput', (content)=>{
    console.log('I am the listener ',content);
})