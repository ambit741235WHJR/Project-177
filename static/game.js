// Calling the fillBlanks function using jQuery
$(document).ready(function () {
    getTemplates();
});

// Function to fetch the templates
function getTemplates() {
    $.ajax({
        url: "/get-templates",
        type: "get",
        success: function (result) {
            fillBlanks(result.word)
        },
        error: function (result) {
            alert(result.responseJSON.message)
        }
    })
}

// Function to fill the blanks
function fillBlanks(randomWord) {
    // Clearing the blanks / Making the blanks empty
    $("#blanks").empty();

    // Showing the blanks using <span> tag
    for (let i = 0; i < randomWord.inputs; i++) {
        $("#blanks").append(`<span class="fill_blanks" id="input_${i}">_</span>`);
    }

    // Showing the hint using category in the array
    $("#hint").html(randomWord.category);

    // Variable: gameOver, value: Boolean(false)
    var gameOver = false;

    // Filling the blanks only if the character match is found
    $(".clickable").click(function () {
        // Variable: correctGuess, value: Boolean(false)
        var correctGuess = false;

        // Getting the id of the button clicked
        let id = $(this).attr("id");

        // Getting the life
        var life = parseInt($("#life").text());

        // Looping through all the letters
        for (var i = 0; i < randomWord.word.length; i++) {
            // Checking if the letter is equal to the button clicked
            if (randomWord.word.charAt(i).toLowerCase() == id) {
                // Checking if the life is still left and blanks are empty/already filled
                if (life > 0 && ($(`.fill_blanks`).eq(i).html() == "_" || $(`.fill_blanks`).eq(i).html() == id)) {
                    // Filling the blanks
                    $(`.fill_blanks`).eq(i).html(id);

                    // Setting the correctGuess to true
                    correctGuess = true;

                    // Checking if the word is guessed
                    if ($("#blanks").text() === randomWord.word.toLowerCase()) {
                        // Showing the winning message
                        $("#result").text("You Won!");

                        // Setting the correctGuess to true
                        correctGuess = true;

                        // Setting the gameOver to true
                        gameOver = true;
                    }
                }
            }
        }

        // Checking if the correctGuess is false and gameOver is false
        if (life > 0 && !correctGuess && !gameOver) {
            life = life - 1;
            $("#life").text(life);
        } else if (life == 0) {
            // Showing the losing message
            $("#result").text("You Lost!");

            // Setting the gameOver to true
            gameOver = true;
        }
    });
}