var db = require("../models");

module.exports = function(app) {
    app.post("/api/blist",function(req,res){
        db.bucketlist.create({
            activity:req.body.activity
         }).then(function(data){
             res.json(data)
         }).catch(function(err){
             res.json(err)
         });                            
    });

    app.get("/",function(req,res){
        db.bucketlist.findAll({
            include: [db.user],
            order: [['activity','ASC']]
        })
        .then(function(data){
            var BLobj = {
                bucketlist: data
            };
            console.log("HERE IS DATA",JSON.stringify(BLobj,null,2));
            res.render("index",BLobj)
        });
    });
    
    app.put("/api/blist/:id",function(req,res){
        if (req.body.userId === '' ) {            
            var newdata= {
                activity:req.body.activity,
                crossed_off:req.body.crossed_off,
                userId:null
            }
        } else {
            var newdata= {
                activity:req.body.activity,
                crossed_off:req.body.crossed_off,
                userId:req.body.userId
            }
        }
        
        db.bucketlist.update(newdata,{
            where: {
                id:req.params.id
            }
        }).then(function(data){
            if (data.changedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
              } else {
                res.status(200).end();
              }      
        });
    });

    app.delete("/api/blist/:id",function(req,res){        
        db.bucketlist.destroy({
            where:{
                id:req.params.id
            }
        }).then(function(data){
            if (data.affectedRows == 0) {
                // If no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
              } else {
                res.status(200).end();
              }      
        }).catch(function(err){
            res.json(err)
        });
    });
}