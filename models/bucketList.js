module.exports = function(sequelize,DataTypes) {
    var bucketlist = sequelize.define("bucketlist",{
        activity: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len:{
                    args:[1,180],
                    msg: "The list item needs to be greater than 1 character but shorter than 180 characters long"            
                }
            }
        },
        crossed_off: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    });
    bucketlist.associate = function(models){
        bucketlist.belongsTo(models.user,{
            foreignKey: {
                allowNull:true
            }
        })
    }
    return bucketlist;
};