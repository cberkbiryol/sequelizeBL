var connection = require("./connection")

var orm = {
    insertOne: function(tableName,vals,cb){
        var queryString = "INSERT INTO " + tableName
        queryString += " (activity,crossed_off) "
        queryString += "VALUES"
        queryString += " (?,?); "        
        console.log(queryString)
        connection.query(queryString,vals,function(err,result){
            if (err) {
                throw err
            }
            cb(result)
        })
    },
    selectAll: function(tableName,cb){
        var queryString = "SELECT * FROM " + tableName + ";"
        connection.query(queryString,function(err,result){
            if (err) {
                throw err
            }
            cb(result)
        })
    },    
    updateOne: function(tableName,col,val,cond,cb) {        
        if (val === "true" || val === "false") {
            fixedVal = val; 
        } else {
            fixedVal = "\"" + val + "\"";
        }
        var queryString = "UPDATE " + tableName
        queryString += " SET "
        queryString +=  col + "=" + fixedVal;
        queryString += " WHERE "
        queryString += cond;
        console.log(queryString);   
        connection.query(queryString, function(err,result){
            if (err) {
                throw err
            }
            cb(result)
        })
    },
    deleteOne: function(tableName,cond,cb) {
        var queryString = "DELETE FROM  ";
        queryString += tableName        
        queryString += " WHERE "
        queryString += cond;       
        connection.query(queryString, function(err,result){
            if (err) {
                throw err
            }
            cb(result)
        })
    }
}

module.exports = orm;