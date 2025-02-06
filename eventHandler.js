const EventEmitter = require('events')
const readLine = require('readline')

class CustomEvents extends EventEmitter{
    
    async getUserInput(){
        const commandLineInterface = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        commandLineInterface.question('to: ', (toEmail)=>{
            commandLineInterface.question('subject: ', (subject)=>{
                commandLineInterface.question('body: ', (body)=>{
                    commandLineInterface.close()
                    this.emit('getUserInput', {toEmail, subject, body})
                })
            })
        })

    }


}

module.exports = CustomEvents