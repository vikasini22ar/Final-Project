var express=require("express");
var app=express();
var bodyParser = require("body-parser");
var mongoose =require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var methodOverride=require("method-override");
// importing models
var User=require("./models/user");
const details = require("./models/details");
var Place=require("./models/places");
// importing routes
var authRoutes=require("./routes/auth");
var placesRoutes=require("./routes/places");


// connecting to the database
mongoose.connect("mongodb://localhost:27017/travelhope121",{useNewUrlParser:true,useUnifiedTopology:true});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// config passport
app.use(require("express-session")({
    secret:"this is a new secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodOverride("_method"));


// creating a middleware to be executed before the actul function executes
app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    res.locals.currentMode="visited";
    next();
});
app.use(placesRoutes);
app.use(authRoutes)


  
app.listen(3500, function(){
    console.log("traveloghope121 app started");
});