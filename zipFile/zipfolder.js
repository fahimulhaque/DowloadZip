const archiver = require('archiver');

exports.downloadZip = (request , respose) => {

    var archive = archiver('zip' , {
        zlib: { level: 9 }
    });

  archive.on('error', function(err) {
    respose.status(500).send({error: err.message});
  });

  //on stream closed we can end the request
  archive.on('end', function() {
    console.log('Archive wrote %d bytes', archive.pointer());
  });

  //set the archive name
  respose.attachment('folder.zip');

  //this is the streaming magic
  archive.pipe(respose);
  archive.directory('Test/', false);
  archive.finalize();
  respose.on('close', function() {
    console.log('Archive wrote %d bytes', archive.pointer());
    return res.status(200).send('OK').end();
  });


};


// example to zip any folder

// const getZipFolder = () => {
//     var output = fs.createWriteStream(`Dummy.zip`);
//     var archive = archiver('zip', {
//     zlib: { level: 9 } // Sets the compression level.
// });
//     archive.on('error', function(err){
//     throw err;
//     });

//     archive.pipe(output);
//     archive.directory('Test/', false);
//     archive.finalize();
// }