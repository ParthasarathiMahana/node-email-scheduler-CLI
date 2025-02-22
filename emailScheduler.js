const fs = require('fs');
require('dotenv').config()
const addEmailToQueue = require('./mq/producer')


const scheduleEmail = (filePath) => {
    fs.readFile(filePath, {encoding:'utf8'}, (err, data)=>{
        if(err){
            return console.log('Error occured while reading the file', err);
        }

        data = JSON.parse(data)
        for(let i=0; i<data.length; i++){
            if(i === (data.length-1)){

                const [targetHourStr, targetMinuteStr] = data[i].time.split(':');
                const targetTime = new Date().setHours(Number(targetHourStr), Number(targetMinuteStr), 0, 0)

                const currentTime = new Date().getTime()
                const remainingTime = targetTime-currentTime

                // time calculation logic for aws
                // const [targetHourStr, targetMinuteStr] = data[i].time.split(':');
                // const targetTime = new Date().setHours(Number(targetHourStr), Number(targetMinuteStr), 0, 0)

                // const currentTimeStr = new Date().toLocaleTimeString("en-IN")
                // const [currentHourStr, currentMinuteStr] = currentTimeStr.split(':');
                // const currentTime = new Date().setHours(Number(currentHourStr)+5, Number(currentMinuteStr)+30, 0, 0)
                // const remainingTime = targetTime-currentTime

                if(remainingTime <= 0){
                    console.log("Scheduled time can only be in future.");
                    return;
                }

                console.log((remainingTime/1000)/60+" min/s to go.");
                addEmailToQueue({'toEmail': data[i].toEmail, 'subject':data[i].subject, 'body': data[i].body}, {delay:remainingTime})
            }
        }
    })
}

module.exports = scheduleEmail