const fs = require('fs');
const nodemailer = require('nodemailer');
const { text } = require('stream/consumers');

const sendMail = async ({toEmail, subject, body,time}) =>{
    // 1. create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'parthasarathimahana@gmail.com',
            pass:'lrtd kbbj ficg qfqm'
        }
    })
    // 2. configure email details
    const mailDetails = {
        from: 'parthasarathimahana@gmail.com',
        to: toEmail,
        subject: subject,
        text: body
    }
    // 3. send email
    try {
        const res = await transporter.sendMail(mailDetails)
        console.log("📤 email sent successfully. ✅");
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
                console.log(data[i].time);
                // sendMail(data[i]);
            }
        }
    })
}

module.exports = scheduleEmail