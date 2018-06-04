var express = require("express");
var bucketlist = require("../models/bucketList");

var router = express.Router();

router.post("/api/blist",function(req,res){
    bucketlist.create([req.body.activity,req.body.crossed],
    function(data){
        res.json({id:data.insertId})
    })
});

router.get("/",function(req,res){
    bucketlist.read(function(data){
        var BLobj = {
            bucketlist: data
        };
        console.log(BLobj);
        res.render("index",BLobj)
    });
});

router.put("/api/blist/:id",function(req,res){
    col=req.body.col;
    val=req.body.val;
    cond = "id = " + req.params.id;
    bucketlist.update(col,val,cond,function(data){
        if (data.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }      
    });
});

router.delete("/api/blist/:id",function(req,res){
    cond = "id = " + req.params.id;
    bucketlist.delete(cond,function(data){
        if (data.affectedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
          } else {
            res.status(200).end();
          }      
    });
});

module.exports = router;