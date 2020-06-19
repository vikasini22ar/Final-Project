var express=require("express");
var router=express.Router();
var User=require("../models/user");
const details = require("../models/details");
var Place=require("../models/places");
var passport=require("passport")



// creating a route for "/"
router.get("/",isLoggedIn ,function(req, res){
    res.render("places/home");
});

// ==========
// auth routes
// ===========
router.get("/register",function(req, res){
    res.render("register");
});
// sign up logic
router.post("/register",function(req,res){
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register")
        }else{
            var detail={
                urname:req.body.urname,
                phone:req.body.phone,
                email:req.body.email
            }
        passport.authenticate("local")(req, res, function(){
            // console.log(User)
            details.create(detail,function(err,userdetail){
                if(err){
                    console.log(err);
                }else{
                    userdetail.userId.id=req.user._id;
                    userdetail.userId.name=req.body.username;
                    userdetail.save()
                }
            })
            res.redirect("/places/home/visited");
        });
    }
        });
 });
//  get req to login
 router.get("/login",function(req,res){
     res.render("register")
 })
//  login post-req route
router.post("/login/user",passport.authenticate("local",{
    successRedirect:"/places",
    failureRedirect:"/register"
}),function(req, res){

});
// logout route
router.get("/logout",function(req, res){
    req.logout();
    res.redirect("/register");
})
// function to be called as middleware to check if the user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();

    }
    res.redirect("/register");
}
module.exports=router;