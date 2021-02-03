var express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
router.use(fileUpload());

router.post('/',(req,res) =>{

    var fname = req.body.id; 
    var pic = req.files.pic;

    path = 'images/'+ fname +'.jpg'
    pic.mv(path, function(err) {
        if (err){
            console.log("Image Upload Error");
            res.sendStatus(400);
        }
        else{
            console.log("File Uploaded");
            res.sendStatus(200);
        }
    });
});

module.exports = router;