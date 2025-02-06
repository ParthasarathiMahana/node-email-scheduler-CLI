const EventEmitter = require('events')
const readLine = require('readline')
const fs = require('fs')

class CustomEvents extends EventEmitter{
    // Event-1(Getting user input from terminal)
    getUserInput(){
        const commandLineInterface = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        
        commandLineInterface.question('to: ', (toEmail)=>{
            commandLineInterface.question('subject: ', (subject)=>{
                commandLineInterface.question('body: ', (body)=>{
                    commandLineInterface.question('scheduledTime in 24hrs format(hh:mm): ', (time)=>{
                        commandLineInterface.close()
                        this.emit('getUserInput', {toEmail, subject, body, time})
                    })
                })
            })
        })
    }

    // Event-2(appending the user input in emails.json file)
    appendData(data){
        fs.readFile('emails.json', (error, fileData)=>{
            error && console.log("Error while reading emails.json", error);
            if(fileData.toString()){
                let emailDataArray = JSON.parse(fileData)
                emailDataArray.push(data)
                this.#addDataToFile(emailDataArray)
                
            }else{
                let emailDataArray = []
                emailDataArray.push(data)
                this.#addDataToFile(emailDataArray)
            }
        })
    }
    // private method to be used inside the class only
    #addDataToFile(data){
        let stringifyEmailData = JSON.stringify(data)
        fs.writeFile('emails.json', stringifyEmailData, 'utf8', (error)=>{
            if(error){
                console.log('Error while adding data to email.jason file, ', error);
            }else{
                console.log(`Your email is successfully scheduled.`);
                this.emit('addEmailDetails', {filePath: 'emails.json'})
            }
        })
    }
}

module.exports = CustomEvents