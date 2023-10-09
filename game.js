//Let us start fresh. FOLLOW THE INSTRUCTIONS STEP BY STEP !!!

/* to select elements by id of clicked button - 
    ($(this).attr('id'));
*/

var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
userClickedPattern = [];

var level = 0;

var started = false; 

$(document).on("keydown", function(event) {
    if (!started){
        nextSequence();
        started = true; 
    }
});


function nextSequence(){
    level=level+1;
    $("h1").text("Level "+level);


    function randomNumber(){                           //function to generate random numbers.
        var randomNumber = (Math.random()*3);
        randomNumber = Math.round(randomNumber);
        return randomNumber;
    }

    var randomChosenColour = randomNumber();
    randomChosenColour = buttonColours[randomChosenColour];
    // now randomChosenColour is a random color from buttonColours array.

    gamePattern.push(randomChosenColour); // value of randomChosenColour's current value is now stored in gamePattern array

    var randomclass = "."+randomChosenColour; //randomcalss is now a random class amongst .red, .yellow, .blue, and .green

    var randomId = $(randomclass).attr('id'); //getting id of the random class
    var randomIdFormat = "#"+randomId; // # is the symbol of id. Now randomIdFormat variable is in the format of Id can can be passed to animations() function

    animations(randomIdFormat);

    buttonSound(randomId);

}

//animating the butten of randomid
function animations(selectedRandomButton){
    $(selectedRandomButton).fadeOut(50);
    $(selectedRandomButton).fadeIn(50);
}

function buttonSound(buttonID){
    switch (buttonID) {

        case "red":
            var buttonAudio = new Audio('./sounds/red.mp3');
            buttonAudio.play();
            break;

        case "blue":
            var buttonAudio = new Audio('./sounds/blue.mp3');
            buttonAudio.play();
            break;

        case "green":
            var buttonAudio = new Audio('./sounds/green.mp3');
            buttonAudio.play();
            break;
    
        case "yellow":
            var buttonAudio = new Audio('./sounds/yellow.mp3');
            buttonAudio.play();
            break;        
        default:
            var buttonAudio = new Audio('./sounds/wrong.mp3');
            buttonAudio.play();
            break;
    }
}

$(".btn").click(function fun1(){
    var userChosenColour = ($(this).attr("id")); // id of the colored button clicked
    var userChosenColourFormat = "#"+userChosenColour; // format of id
    animations(userChosenColourFormat);
    buttonSound(userChosenColour);
    userClickedPattern.push(userChosenColour); // when user clicks a
    console.log("USER PATTERN",userClickedPattern); // array is displayed in console.log
    console.log("GAME PATTERN",gamePattern);
    var lastArrayElement = userClickedPattern.length-1; // storing the last element of the array in variable lastArrayElement
    checkAnswer(lastArrayElement);

    function checkAnswer(currentLevel){
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
          if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
            nextSequence();
            }, 1000);
            while(userClickedPattern.length>0){
                userClickedPattern.pop();
            }
        }
        } else {
            $("body").addClass("game-over");
            $("h1").text("Game Over");
            buttonSound("wrong");
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 2000); // red bg removed after 2 seconds

            setTimeout(function () {
                startOver();
                }, 2500);
        } 
    }
});

/*  ----------  EXPLANATION OF checkAnswer(currentLevel) function code:-     ---------------------------------------------------------------------------------------------------------------------

    1. var lastArrayElement is the index of last element of userClickedPattern array
    2. lastArrayElement is passed in function checkAnswer(). for example, for first time it will be 0, then 1 etc.
    3. firstly check index value of gamePattern[currentLevel] === userClickedPattern[currentLevel]. example, for 1st time, it is checked if gamePattern[0] === userClickedPattern[0]
    4. if the above condition is false, else block (GAME OVER) will run.
    5. if the above condition is true, check if length of gamePattern === userClickedPattern.
    6. if this second condition is also true, computer will tell the nect button to press.
    7. after telling what button to press, computer will clear array userClickedPattern. so user has to press all buttons in sequence from start.
  
                                    OR

    NOTE - In simple words, if the last element of both array is same, check if the length of both arrays is same. If both these conditions are same, then proceed to next element, else GAME OVER.
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
*/


//for allowing any keydown only once to start the game


// $(document).one("keypress", function(event){
//     nextSequence();
// });

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    nextSequence();
}