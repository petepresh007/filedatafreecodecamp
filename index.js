var express = require('express');
var cors = require('cors');
require('dotenv').config();
var upload = require("./multer");

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;
  if (file) {
    res.status(201).json({
      name: file.filename,
      type: file.mimetype,
      size: file.size
    });
  }
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
