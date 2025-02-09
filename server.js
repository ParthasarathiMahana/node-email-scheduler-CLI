const express = require('express')

const server = express()

server.listen(3000, (err)=>{
    if(err){
        return console.log("Error occured while starting the server. \n", err);
    }

    log('Server is up and running on port number: ', 3000)
})