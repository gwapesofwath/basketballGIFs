//inital array of basketball topics
var topics = ["Shaquille O'Neal", "Buzzer Beater", "Charles Barkley", "Basketball Fans", "Kobe", "90s Basketball", "Dunks", "White Chocolate", "Lebron James", "Gregg Popovich", "Basketball Cartoon"];

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
$(document).on("click",".basketballTings", function() {

    for (var g = 0; g < 10; g++ ) {

    var topic = $(this).attr("data-name");
    
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=ShzYiNXVS6tBkqGxnjhi13ylw1ARwsOU&limit=10&tag=" + topic;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var gifUrl = response.data.images.downsized_medium.url;
        console.log(response);
        var newGif = $("<img>");

        newGif.attr("src", gifUrl);
        newGif.attr("alt", "basketball gif");
        $("#basketballGifs").prepend(newGif);
    

    })
    }
})

//on click event function for adding a new buton
$("#addBasketball").on("click", function(event) {
    event.preventDefault();
    var newButton = $("#basketball-input").val().trim();
    topics.push(newButton);
    createButtons();
});

