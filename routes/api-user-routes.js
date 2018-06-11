var db = require("../models");

module.exports = function(app) {
    app.post("/api/user",function(req,res){
        db.user.create({
            name:req.body.name
         }).then(function(data){
             res.json(data)
         }).catch(function(err){
             res.json(err)
         });                            
    });
    app.get("/api/user/:name",function(req,res){
        db.user.findOne({
            where:{
                name:req.params.name
            }
        })
        .then(function(data){
             res.json(data)
         }).catch(function(err){
             res.json(err)
         });                            
    });
}