const fs = require('fs');

const scheduleEmail = (filePath) => {
    fs.readFile(filePath, {encoding:'utf8'}, (err, data)=>{
        if(err){
            return console.log('Error occured while reading the file', err);
        }

        console.log(data);
    })
}

module.exports = scheduleEmail