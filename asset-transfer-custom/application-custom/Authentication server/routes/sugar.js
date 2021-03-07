import  express  from 'express';
import  mysql from 'mysql';

const router = express.Router();

// MySQL Connection
// var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'viraj',
    password: 'qwerty',
    database: 'ehr'
});
connection.connect(function(err) {
    if (!err) {
        console.log('Connected to MySql!');
    } else {
        console.log('Not connected to MySql.');
    }
});

//To List All Sugar Report
router.post('/sugar', (req, res) =>{

    var id = req.body.id;

    connection.query("SELECT id,type,lab_name,da_te FROM sugar_report WHERE profile_id=?",[id],function(error,result) {
		if(error){
            // res.sendStatus(400);
			console.log("Sugar Report Listing Error");
        }
        else{
                console.log("Sugar Report Listed Successfully");
                res.status(200).send({"report":result});
        }
    });
});

//Describe Sugar Report
router.post('/sugar/desc', (req, res) =>{

    var id = req.body.id;

    connection.query("SELECT * FROM (SELECT sugar_report.id,profile_id,email,name,gender,phone,type,da_te,value,result,CONVERT(comment USING utf8) as comment FROM sugar_report,profile WHERE profile.id= sugar_report.profile_id) as test WHERE id=?",[id],function(error,result) {
		if(error){
            // res.sendStatus(400);
			console.log("Sugar Report Description Error");
        }
        else{
                console.log("Sugar Report Description Successfully");
                res.status(200).send({"report":result});
        }
    });
});

export default router;