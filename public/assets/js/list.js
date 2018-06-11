$(function () {
    $(".addItem").on("submit", function (event) {
        event.preventDefault();
        var newItem = {
            activity: $("#newItem").val().trim(),
        };                
        $.ajax("/api/blist", {
            type: "POST",
            data: newItem
        }).then(function () {
            //console.log("created new list item");
            //console.log(newItem);            
            location.reload();
        });       
    });

    $(".crossItem").on("click", function (event) {
        var id = $(this).data("id");
        var Stat = $(this).data("newstat");                
        //console.log(Stat)
        // if already crossed off
        if (Stat) {
            var crossedOff = {
                activity: $(this).closest("li").data("item"),
                crossed_off:false,
                userId: null              
            };
            $.ajax("/api/blist/" + id, {
                type: "PUT",
                data: crossedOff
            }).then(function () {
                //console.log("Changed itemID " + id + " to " + newStat)
                location.reload();
            });
        // if we are crossing it off now
        } else {
            var thisName = $(this).closest("li").find("input.newUser").val().trim();
            if (!thisName) {
                alert("Please Enter a name!");
                return;
            }
            var crossedOff = {
                activity: $(this).closest("li").data("item"),
                crossed_off:true, 
                userId:null          
            };
            var newUser = {
                name: thisName
            };
            // check if the user is already in the database
            $.get("/api/user/" + newUser.name)
            .then(function(result){
                // if in users table in database associate wit the user id
                if (result !== null){                    
                    crossedOff.userId=result.id;             
                $.ajax("/api/blist/" + id, {
                    type: "PUT",
                    data: crossedOff
                }).then(function () {
                    //console.log("Changed itemID " + id + " to " + newStat)
                    location.reload();
                }); 
                 // if user is not in the table create new user and associate with bucketlist item
                } else {
                    $.ajax("/api/user", {
                        type: "POST",
                        data: newUser
                    }).then(function (result) {
                        //console.log("created new user");   
                        //console.log(JSON.stringify(result,null,2))  
                        crossedOff.userId=result.id;             
                        $.ajax("/api/blist/" + id, {
                            type: "PUT",
                            data: crossedOff
                        }).then(function () {
                            //console.log("Changed itemID " + id + " to " + newStat)
                            location.reload();
                        })           
                    });
                }
            }); 
        }                  
    });

    $(".deleteItem").on("click", function (event) {
        var id = $(this).data("id");
        $.ajax("/api/blist/" + id, {
            type: "DELETE"
        }).then(function () {
            //console.log("Deleted itemID " + id)
            location.reload();
        })
    });

    $(document).on("click", ".BLitem", function() {
        var Litem = $(this).closest("li");
        var currentItem = Litem.data("item");             
        Litem.children().hide();
        Litem.children("input.edit").val(currentItem);
        Litem.children("input.edit").show();
        Litem.children("input.edit").focus();
    });

    $(document).on("keyup", ".edit", function(event){                
        if(event.which === 13) {            
            var Litem = $(this).closest("li");            
            var newItem = $(this).val().trim();
            $(this).blur();                                      
            var id = Litem.find("button.crossItem").data("id");
            var Stat=Litem.find("button.crossItem").data("newstat"); 
            var updateActivity = {
                activity: newItem,
                crossed_off:Stat             
            }
            $.ajax("/api/blist/" + id,{
                method:"PUT",
                data: updateActivity               
            }).then(function(){
                location.reload();
            })
        }
    });

    $(document).on("blur", ".edit", function(){
        var Litem = $(this).closest("li");
        var currentItem = Litem.data("item");
        if (currentItem){
            Litem.children().hide();
            Litem.children("input.edit").val(currentItem)
            Litem.children("span").show();
            Litem.children("button").show();
            Litem.children("div").show();
        }
    });
})