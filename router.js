var express = require('express')
var router = express.Router()

const credential={
    email : "admin@gmail.com",
    password : "admin"
}
router.post('/login', (req, res) =>{
     if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user=req.body.email
        res.redirect('/route/dashboard')
        // res.end("Sucess")
     }
     else{
        res.end("Invalid credentials")
     }
});


router.get('/dashboard',(req, res)=>{
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
    }else{
        res.render("login",{title:'Express',logout:'Please login'})
    }
})

router.get('/logout',(req,res) => {
    res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('login',{title:"Express",logout:"Successfull"})
        }
    })
})

module.exports = router;