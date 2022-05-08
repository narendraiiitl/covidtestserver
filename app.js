const express = require('express')
const request = require('request')
const fs = require('fs')
const cors = require('cors')
require('dotenv').config();
const app = express();
const axios = require('axios');
var formidable = require('formidable');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use(express.json());
app.use(cors());


app.post('/', upload.single('image'), (req, res) => {
    var tmp_path = req.file.path;
    var target_path = 'uploads/' + req.file.originalname;
    fs.readFile(tmp_path, function (err, data) {
        fs.writeFile(target_path, data, function (err) {
        })
    })
    setTimeout(() => {
        var formData = {
            "image": fs.createReadStream(target_path),
        };
        request.post({ url: process.env.url, formData: formData }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
            console.log('Upload successful!  Server responded with:', body);

            res.send(body);
        }); 
    }, 3000)
})
app.listen(process.env.PORT || 3000, () => {
    console.log("Server Started ");
})