const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000;

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));

app.post('/upload-file', function(req, res) {
  res.set('Access-Control-Allow-Origin','http://localhost:4200');
  res.set('Access-Control-Allow-Methods','PUT, GET, POST');
  console.log(req.files); // the uploaded file object
  res.send();
});

app.options('/upload-file', (req, res) => {
  res.set('Access-Control-Allow-Origin','http://localhost:4200');
  res.set('Access-Control-Allow-Methods','PUT, GET, POST');
  res.send();
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
