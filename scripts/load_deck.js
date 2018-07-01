$(function () {
    $("#roll").on("click", function () { get_random_card(); });

    set_max_value();

    get_card_by_id(1);

    $("#number").on("keyup", function(event){
        let nr_value = parseInt($("#number").val(), 10);
        let min = parseInt($("#number").attr("min"), 10);
        let max = parseInt($("#number").attr("max"), 10);

        if(nr_value >= min && nr_value <= max){
            get_card_by_id(nr_value);
        }
    });

    $("#name").on("keyup", function(event){
        let name = $("#name").val();
        if(name != "" && name != null && $(".all_cards").attr("id") == "hide"){
            set_by_name(name);
        }
        if(name === "" && $(".all_cards").attr("id") == "hide"){
            show_all_cards();
        }
    });

    $("#next").on("click", function(){
        let max = parseInt($("#number").attr("max"), 10);
        let nr_value = parseInt($(".cards_table").attr("id"), 10);

        if(nr_value < max){
            get_card_by_id(nr_value + 1);
        }
    });

    $("#prev").on("click", function(){
        let min = parseInt($("#number").attr("min"), 10);
        let nr_value = parseInt($(".cards_table").attr("id"), 10);

        if(nr_value > min){
            get_card_by_id(nr_value - 1);
        }
    });

    $(".all_cards").on("click",function(){
        if($(".all_cards").attr("id") == "show"){
            let name = $("#name").val();
            if(name != "" && name != null){
                set_by_name(name);
            }else{
                show_all_cards();
            }
            $(".all_cards").attr("id", "hide");
            $(".all_cards").html("Hide all cards");
        }else{
            $(".show_all_cards").slideUp("slow");
            $(".all_cards").attr("id", "show");
            $(".all_cards").html("Show all cards");
        }
    });
});

function get_random_card(){
    $.ajax({
        dataType: "json",
        url: "resources/deck.json",
        mimeType: "application/json",
        success: function (result) {
            let random_card = Math.floor((Math.random() * (result.length - 1)) + 1);
            for(let i in result){
                if(result[i].id === random_card){
                    let card = result[i];
                    $(".cards").html(
                        `<div class="card" style="text-align: center;">
                        <div class="card-header">
                        <h3 class="float-left">${card.id}. ${card.name}</h3>
                        <h4 class="float-right closing_x" id="close"> <b>X</b> </h4>
                        </div>
                        <p class="card-body">${card.description}</p>
                        </div>`);
                    $(".cards").slideDown("fast");
                    $("#close").on("click",function(){
                        $(".cards").slideUp("fast");
                    });
                }
            }
        },
        error: function (message) {
            console.log("Ajax call error:");
            console.log(message);
        }
    });
}

function set_max_value(){
    $.ajax({
        dataType: "json",
        url: "resources/deck.json",
        mimeType: "application/json",
        success: function (result) {
            $("#number").attr("max", result.length);
            $(".total_cards").html("Total: " + result.length);
        },
        error: function (message) {
            console.log("Ajax call error:");
            console.log(message);
        }
    });
}

function get_card_by_id(id){
    $.ajax({
        dataType: "json",
        url: "resources/deck.json",
        mimeType: "application/json",
        success: function (result) {
            for(let i in result){
                if(result[i].id === id){
                    let card = result[i];
                    $(".cards_table").html(
                        `<div class="card" style="text-align: center;">
                        <div class="card-header" style="overflow: auto;">
                        <h3>${card.name}</h3>
                        </div>
                        <p class="card-body card_description">${card.description}</p>
                        </div><br>`);
                    $(".cards_table").attr("id" , id);
                }
            }
        },
        error: function (message) {
            console.log("Ajax call error:");
            console.log(message);
        }
    });
}

function show_all_cards(){
    $.ajax({
        dataType: "json",
        url: "resources/deck.json",
        mimeType: "application/json",
        success: function (result) {
            let all_cards = "<div class=\"row\">";
            let count = 1;
            for(let i in result){
                let card = result[i];
                all_cards += 
                `
                <div class="col-sm-4">
                <div class="card" style="text-align: center;">
                <div class="card-header">
                <h3>${card.id}. ${card.name}</h3>
                </div>
                <p class="card-body card_description">${card.description}</p>
                </div>
                </div>
                `
                if(count % 3 === 0){
                    all_cards += "</div><div class=\"row\">"
                }
                count += 1;
            }
            all_cards += "</div>"
            $(".show_all_cards").html(all_cards);
            $(".total_cards").html("Total: " + result.length);
            $(".show_all_cards").slideDown("slow");
        },
        error: function (message) {
            console.log("Ajax call error:");
            console.log(message);
        }
    });
}

function set_by_name(name){
    $.ajax({
        dataType: "json",
        url: "resources/deck.json",
        mimeType: "application/json",
        success: function (response) {
            let result = Array();
            for(let i in response){
                if(((response[i].name).toLowerCase()).includes(name.toLowerCase()) || 
                    ((response[i].description).toLowerCase()).includes(name.toLowerCase())){
                    result.push(response[i]);
                }
            }
            $(".total_cards").html("Total: " + result.length);
            let all_cards = "<div class=\"row\">";
            let count = 1;
            for(let i in result){
                let card = result[i];
                all_cards += 
                `
                <div class="col-sm-4">
                <div class="card" style="text-align: center;">
                <div class="card-header">
                <h3>${card.id}. ${card.name}</h3>
                </div>
                <p class="card-body card_description">${card.description}</p>
                </div>
                </div>
                `
                if(count % 3 === 0){
                    all_cards += "</div><div class=\"row\">"
                }
                count += 1;
            }
            all_cards += "</div>"
            $(".show_all_cards").html(all_cards);
            $(".show_all_cards").slideDown("slow");

        },
        error: function (message) {
            console.log("Ajax call error:");
            console.log(message);
        }
    });
}