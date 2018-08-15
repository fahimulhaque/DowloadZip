const express = require('express');
const app = express();
const  zipFile = require('./zipFile/zipfolder.js');

app.get('/' , (req , res) => {
    res.send({'Name' : 'Fahim'  , 'requestDetails' : JSON.stringify(req.headers)});
})


app.get('/downloadzip' , zipFile.downloadZip);


app.listen(3000 , () => {
    console.log('Http server started at port 3000');
})