$(function () {
    $(".addItem").on("submit", function (event) {
        event.preventDefault();
        var newItem = {
            activity: $("#newItem").val().trim(),
            crossed: 0
        };

        $.ajax("/api/blist", {
            type: "POST",
            data: newItem
        }).then(function () {
            //console.log("created new list item");
            location.reload();
        })
    });

    $(".crossItem").on("click", function (event) {
        var id = $(this).data("id");
        var Stat = $(this).data("newstat");
        if (Stat) {
            var newStat = false;
        } else {
            var newStat = true;
        }
        var crossedOff = {
            col: "crossed_off",
            val: newStat
        };

        $.ajax("/api/blist/" + id, {
            type: "PUT",
            data: crossedOff
        }).then(function () {
            //console.log("Changed itemID " + id + " to " + newStat)
            location.reload();
        })


    })
    $(".deleteItem").on("click", function (event) {
        var id = $(this).data("id");
        $.ajax("/api/blist/" + id, {
            type: "DELETE"
        }).then(function () {
            //console.log("Deleted itemID " + id)
            location.reload();
        })
    })
    $(document).on("click", ".BLitem", function() {
        var currentItem = $(this).data("item");        
        $(this).children().hide();
        $(this).children("input.edit").val(currentItem);
        $(this).children("input.edit").show();
        $(this).children("input.edit").focus();
    });
    $(document).on("keyup", ".BLitem", function(event){                
        if(event.which === 13) {
            var newItem = $(this).children("input.edit").val().trim();
            $(this).blur();
            var id = $(this).children("button.crossItem").data("id");
            var updateActivity = {
                col: "activity",
                val: newItem                
            }
            $.ajax("/api/blist/" + id,{
                method:"PUT",
                data: updateActivity 
            }).then(function(){
                location.reload();
            })
        }
    });
    $(document).on("blur", ".BLitem", function(){
        var currentItem = $(this).data("item");
        if (currentItem){
            $(this).children().hide();
            $(this).children("input.edit").val(currentItem)
            $(this).children("span").show();
            $(this).children("button").show();
            $(this).children("br").show();
        }
    });
})