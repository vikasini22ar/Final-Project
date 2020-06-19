var mongoose=require("mongoose");
var express=require("express");
var router=express.Router();
var Place=require("../models/places");
var passport=require('passport');

// INDEX 
// creating a route for"/places" 
router.get("/places",isLoggedIn, function(req, res){
    //   get all placesfrom db
                res.redirect("places/home/visited");  
    });
    // CREATE
    router.post("/places/create",isLoggedIn,function(req, res){
        var name=req.body.name;
        var image=req.body.image;
        var date=req.body.date;
        var description=req.body.description;
        var visited=req.body.visited;
        var bucketlist=req.body.bucketlist;
        var author=req.user.username;
        var placeid={
            id:req.user._id
        }
        var newPlace= {name: name,image: image, date: date,description: description,visited: visited,bucketlist: bucketlist,placeid: placeid,author: author}
    
         addPlace(newPlace);
         
            // redirect back to places page
            res.redirect("/places");
        
    
    });
    // NEW
    router.get("/places/new",isLoggedIn,function(req, res){
        res.render("places/new");
    });
   
    // 
    router.get("/places/home/:mode",function(req, res){
        if(req.params.mode=="bucket"){
            Place.find({bucketlist:true,author:req.user.username},function(err,bucketPlaces){
                if(err){
                    console.log(err);

                }else{
                    res.render("places/home",{places:bucketPlaces,currentMode:false})
                }
            })
        }else if(req.params.mode=="visited"){
            Place.find({visited:true,author:req.user.username},function(err,visitedPlaces){
                if(err){
                    console.log(err);
                }else{
                    res.render("places/home",{places:visitedPlaces,currentMode:true})
                }
            })

        }
    })
    // edit -route
    router.get("/places/:id/edit",checkPlaceOwnership,function(req,res){
        Place.findById(req.params.id, function(err, foundPlace){
            if(err){
                console.log(err);
            }else{
                res.render("places/edit",{place: foundPlace});
            };
        });
    });
    // update
    router.put("/places/:id",checkPlaceOwnership, function(req, res){
        var name=req.body.name;
        var image=req.body.image;
        var date=req.body.date;
        var description=req.body.description;
        var visited=req.body.visited;
        var bucketlist=req.body.bucketlist;
        var author=req.user.username;
        var placeid={
            id:req.user._id
        }
        var newPlace= {name: name,image: image, date: date,description: description,visited: visited,bucketlist: bucketlist,placeid: placeid,author: author}
    
      updatePlace(req.params.id,newPlace);
      
        res.redirect("/places");
    
    });
    // destroy the place
    router.get("/places/:id/delete",checkPlaceOwnership,function(req, res){
      deletePlace(req.params.id, req, res)
    });
    // function to be called as middleware to check if the user is logged in
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();

    }
    res.redirect("/register");
}
// function to be called as middleware the user is authorised to make changes
function checkPlaceOwnership(req,res, next){
    if(req.isAuthenticated()){
        Place.findById(req.params.id, function(err, foundPlace){
            if(err){
                res.redirect("/places");
            }else{
                // check is the place is current user created
                if(foundPlace.placeid.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
}
function addPlace(newPlace, req, res){
         // get data from form & add to array
         Place.create(newPlace, function(err, newlyCreated){
            if(err){
                console.log(err);
            }
        return ;
         });
}
function updatePlace(id, place){
    Place.findByIdAndUpdate(id,place, function(err,updatedPlace){
        if(err){
            console.log(err);
        }
    });
}
function deletePlace(id,req, res){
    Place.findByIdAndRemove(id, function(err){
        if(err){
            res.redirect("/places");
        }else{
            res.redirect("/places")
        }
    });
}
    module.exports=router;