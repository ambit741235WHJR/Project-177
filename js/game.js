let words = [
    {
        "inputs": 5,
        "category": "Sports",
        "word": "Chess"
    },
    {
        "inputs": 6,
        "category": "European Country Name",
        "word": "France"
    },
    {
        "inputs": 5,
        "category": "Fruit",
        "word": "Mango"
    },
    {
        "inputs": 5,
        "category": "Fruit",
        "word": "Apple"
    },
    {
        "inputs": 7,
        "category": "Sports",
        "word": "Cricket"
    }
];

// Calling the fillBlanks function using jQuery
$(document).ready(function () {
    fillBlanks();
});

// Function to fill the blanks
function fillBlanks() {
    // Getting the random word from the array
    const randomWord = words[Math.floor(Math.random() * words.length)];

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
    });
}