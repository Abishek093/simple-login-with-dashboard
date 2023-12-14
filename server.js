const express = require('express')
const path = require('path')
const app = express()
const passport = require('passport');
const bycypt = require('bcrypt');
const bodyparser = require('body-parser')
const { name } = require('ejs');
const session  = require('express-session');
const{v4:uuidv4} = require('uuid');
const router = require('./router');
// const users =[];    
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:false
  }));

app.use('/route', router); 


const checkAuth = (req, res, next) => {
  if (req.session.user) {
    return res.redirect('/route/dashboard'); 
  }
  next();
};



app.get('/',checkAuth,(req,res)=>{
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.render('login',{title: "login"});
})


app.listen(5000)