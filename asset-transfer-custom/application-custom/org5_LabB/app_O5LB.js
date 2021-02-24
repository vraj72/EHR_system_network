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
const port = 8040;

app.get('/',function(req, res){
    res.render('login.hbs',{layout: false});
});
app.get('/insert',function(req, res){
    res.render('insert.hbs',{layout: false});
});

app.use(express.static(path.join(__dirname,'/public')));

app.listen(port, () => {
    console.info(`Server running on port ${port}`);
    console.log(__dirname);
});