import  express  from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';

// MySQL Connection
import  mysql from 'mysql';
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
        console.log('Not connected to MySql.'+err);
    }
});

//Login
router.post('/login', (req,res) => {
	var email = req.body.username;
	var pass = req.body.password;

	connection.query("SELECT id,password,email,name,CONVERT(private USING utf8) as private,CONVERT(public USING utf8) as public FROM profile WHERE email=?",[email],function(error,results){
		if(error) {
				console.log("Login Error");
	    		res.sendStatus(400);
		}
		else {
		
			if(results.length>0){	    		
				bcrypt.compare(pass,results[0].password,function(err, resp) {
					if(resp) {
						console.log("Succesfully Logged In");
						// var url= "http://134.209.152.226:8000/images/"+results[0].pic;
					    res.status(200).send({"status":"success","message":"Successfully Logged In","id":results[0].id,"name":results[0].name,"email":results[0].email,"public":results[0].public,"private":results[0].private});
					} else {
					     res.status(400).send({"status":"error","message":"Username or Password Error"});
					}
		    		});
			}
			else{
				res.status(400).send({"status":"error","message":"Username or Password Error"});
			}
		}
	});
});
export default router;
