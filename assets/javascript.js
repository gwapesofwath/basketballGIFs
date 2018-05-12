//inital array of basketball topics
var topics = ["Tim Duncan", "Buzzer Beater", "Charles Barkley", "Basketball Fans", "Kobe", "90s Basketball", "Dunks", "Shaquille O'Neal", "White Chocolate", "Lebron James", "Gregg Popovich", "Basketball Cartoon", "Shawn Kemp", "Russel Westbrook", "Metta World Peace", "Reggie Miller", "Swaggy P"];

//display buttons of basketball topics with for loop
function createButtons() {
    $("#newButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("basketballTings");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#newButtons").append(button);
    }
}

//calling create buttons function
createButtons();

//on click event function for each unique button. When button is clicked 
//ajax get method is called and a promise is returned
$("#newButtons").on("click",".basketballTings", function() {

    // for (var g = 0; g < 10; g++ ) {

        var topic = $(this).attr("data-name");
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=ShzYiNXVS6tBkqGxnjhi13ylw1ARwsOU&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            $("#basketballGifs").empty();  
            console.log(response.data[0]);         
            for (let g = 0; g < response.data.length; g++) {
                let gifUrl = response.data[g].images.downsized_medium.url;
                let stillUrl = response.data[g].images["480w_still"].url;
                let rating = response.data[g].rating;
                let newGif = $("<img>");
                newGif.addClass("gifImage");
                newGif.attr("data-stillUrl", stillUrl);
                newGif.attr("data-gifUrl", gifUrl)
                newGif.attr("src", stillUrl);
                newGif.attr("alt", "basketball gif");

                $("#basketballGifs").prepend(newGif,rating);
            } 

        })
    // }
})

//on click event function for animating gifs
$("#basketballGifs").on("click",".gifImage", function() {
    var gifUrl = $(this).attr("data-gifUrl");
    var stillUrl = $(this).attr("data-stillUrl");
    if ($(this).attr("src")===stillUrl){
        $(this).attr("src", gifUrl)
    }
    else ($(this).attr("src", stillUrl))
})

//on click event function for adding a new buton
$("#addBasketball").on("click", function(event) {
    event.preventDefault();
    var newButton = $("#basketball-input").val().trim();
    topics.push(newButton);
    createButtons();
});

