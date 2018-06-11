module.exports = function(sequelize,DataTypes) {
    var user = sequelize.define("user",{
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:{
                    args:[1,140],
                    msg: "The name needs to be greater than 1 character but shorter than 140 characters long"            
                }
            }
        }
    });
    user.associate = function(models){
        user.hasMany(models.bucketlist,{
            onDelete: "cascade"
        })
    }
    return user;
};