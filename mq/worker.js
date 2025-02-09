const nodemailer = require('nodemailer');
const {Worker} = require('bullmq')
require('dotenv').config({path: '../.env'})

const emialWorker = new Worker('emailQueue', 
    async (job) => {
        console.log('Sending the email....')

        const {toEmail, subject, body} = job.data;

        let transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth:{
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            },
        })

        const mailDetails = {
            from: process.env.SMTP_USER,
            to: toEmail,
            subject: subject,
            text: body
        }

        try {
            await transporter.sendMail(mailDetails)
            console.log("Email sent successfully...")
        } catch (error) {
            console.log("Error occured while sending the mail \n", error);
        }
    },
    {connection:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }}
)

console.log("Worker is up and running...");