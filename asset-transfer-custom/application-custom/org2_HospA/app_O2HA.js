import express from 'express';
//server imports
import patient from './routes/patient.js';
import permission from './routes/permission.js';
const app = express();
app.use(express.json());
import path from 'path';
const __dirname = path.resolve(path.dirname(''));
import cors from 'cors';
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));

//server variables
const port = 9060;
app.use('/patient', patient);

app.use('/permission', permission);

app.get('/',(req,res) =>{
	res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.get('/login',(req,res) =>{
	res.sendFile(path.join(__dirname+'/views/login.html'));
});
app.get('/dashboard',(req,res) =>{
	res.sendFile(path.join(__dirname+'/views/dashboard.html'));
});
app.get('/BloodReport',(req,res) =>{
	res.sendFile(path.join(__dirname+'/views/blood.html'));
});
app.get('/SuagrReport',(req,res) =>{
	res.sendFile(path.join(__dirname+'/views/sugar.html'));
});

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
});
