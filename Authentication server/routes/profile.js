var express = require('express');
const router = express.Router();

// MySQL Connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ehr'
});
connection.connect(function(err) {
    if (!err) {
        console.log('Connected to MySql!');
    } else {
        console.log('Not connected to MySql.');
    }
});

router.post('/', (req, res) =>{

    var id = req.body.id;

    connection.query("SELECT id,email,name,gender,dob,phone,address FROM profile WHERE id=?",[id],function(error,result) {
		if(error){
            // res.sendStatus(400);
			console.log("Profile Error");
        }
        else{
                console.log("Profile Successfull");
                // var url= "http://134.209.152.226:8000/images/"+result[0].pic;
                res.status(200).send({"profile":result[0]});
        }
    });
});

module.exports = router;