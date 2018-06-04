var orm = require("../config/orm")

var bucketlist = {
    create: function(vals,cb) {
        orm.insertOne("bucketlist",vals,function(res){
            cb(res)
        });
    },
    read: function(cb) {
        orm.selectAll("bucketlist",function(res){
            cb(res);
        });
    },
    update: function(col,val,cond,cb){
        orm.updateOne("bucketlist",col,val,cond,function(res){
            cb(res);
        });
    },
    delete: function(cond,cb){
        orm.deleteOne("bucketlist",cond,function(res){
            cb(res);
        });
    }    
};

module.exports = bucketlist;