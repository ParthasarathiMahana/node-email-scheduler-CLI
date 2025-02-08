const fs = require('fs');
const nodemailer = require('nodemailer');
const { text } = require('stream/consumers');
require('dotenv').config()

const sendMail = async ({toEmail, subject, body,time}) =>{
    // 1. create transporter
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth:{
            user: process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
        }
    })
    // 2. configure email details
    const mailDetails = {
        from: process.env.SMTP_USER,
        to: toEmail,
        subject: subject,
        text: body
    }
    // 3. send email
    try {
        const res = await transporter.sendMail(mailDetails)
        console.log("\n ✅ email sent successfully. ✅ \n");
    } catch (error) {
        console.log('\n ❌ error occured while sending the mail ❌ \n', error);
    }
}

const scheduleEmail = (filePath) => {
    fs.readFile(filePath, {encoding:'utf8'}, (err, data)=>{
        if(err){
            return console.log('Error occured while reading the file', err);
        }

        data = JSON.parse(data)
        for(let i=0; i<data.length; i++){
            if(i === (data.length-1)){
                const [targetHourStr, targetMinuteStr] = data[i].time.split(':');
                const currentTime = new Date().getTime()
                const targetTime = new Date().setHours(Number(targetHourStr), Number(targetMinuteStr), 0, 0)
                const remainingTime = targetTime-currentTime
                console.log((remainingTime/1000)/60+" min/s to go.");
                
                setTimeout(()=>sendMail(data[i]), remainingTime)
            }
        }
    })
}

module.exports = scheduleEmail