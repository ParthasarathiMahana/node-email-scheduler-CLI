const {Queue} = require('bullmq')
require('dotenv').config('../.env')

// 1. create queue to add tasks/emails
const emailQueue = new Queue('emailQueue', {
    connection:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
})

// 2. add task to the queue
const addEmailToQueue = async (emailData, delay) => {
    await emailQueue.add('sendEmail', emailData, delay)
    console.log("Your email is scheduled. ");
    process.exit(0)
}

module.exports = addEmailToQueue