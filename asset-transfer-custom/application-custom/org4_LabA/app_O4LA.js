import express from 'express';
import exphbs  from 'express-handlebars';
import path from 'path';
import cors from 'cors';
const __dirname = path.resolve(path.dirname(''));
const app = express();
app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));

//server variables
const port = 7090;

app.get('/',function(req, res){
    res.render('login.hbs',{layout: false});
});
app.get('/insert',function(req, res){
    res.render('insert.hbs',{layout: false});
});
app.get('/insert_sugar',function(req, res){
    res.render('sugar_report.hbs',{layout: false});
});

app.get('/insert_blood',function(req, res){
    res.render('blood_report.hbs',{layout: false});
});

app.use(express.static(path.join(__dirname,'/public')));
// app.use(express.static(path.join(__dirname,'/public/javascript')));

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
    console.log(__dirname);
});
