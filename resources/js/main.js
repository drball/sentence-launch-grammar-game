var questionNum = 0;
var correctAnimLength = 400;
var totalQuestions = 10;

$(document).ready(function() {
    $(".reset-button").hide();
});

function playButtonPressed() {

    console.log("pressed");

    var game = $(".game");

    document.getElementById("button-click-sfx").play();

    if(!game.hasClass("game-active")){

        //-- to to screen 2
        game.addClass("game-active");

        setTimeout(function() {
            startGame();
        }, 500);
    }
}

function menuButtonPressed() {

    var game = $(".game");

    if(game.hasClass("game-active")){
        //-- show screen 1 
        game.removeClass("game-active");
    }
}

function startGame(){
    console.log("start");
    $(".countdown").text(totalQuestions);
    $(".rocket").removeClass("rocket--active");
    showNewQuestion();
}

function showNewQuestion(){

    console.log("show new question");

    //--random question - but NOT the previous one
    questionNum = Math.floor(Math.random() * questions.length);

    //--show the question
    $(".question").text("\"" + questions[questionNum].question + "\"");

    //--set the answer
    $(".answer").each(function() {

        //--reset the classes
        $(this).removeClass("answer--correct-answer");
        $(this).removeClass("answer--right");
        $(this).removeClass("answer--wrong");

        // console.log("comparing "+$(this).data("type")+"with"+questions[questionNum].answer);

        //--represent the correct question on the button
        if($(this).data("type") == questions[questionNum].answer){
            $(this).addClass("answer--correct-answer");
        }

    });

    //--fade the questions in
    setTimeout(function() {
        $(".question-container").addClass("question-container--active");
    }, 1000);

}

function answerPressed(btn){

    if($(btn).hasClass("answer--correct-answer")){
        //--correct answer was chosen
        $(btn).addClass("answer--correct-chosen");

        setTimeout(function() {

            //--temporarily hide the questions
            $(".question-container").removeClass("question-container--active");

            var countdown = $("#countdown");
            var countdownNum = parseInt(countdown.text());
            var newCountdownNum = countdownNum - 1;

            //--decrement the countdown & flash it
            countdown.text(newCountdownNum);
            countdown.addClass("flash");

            setTimeout(function() {
                countdown.removeClass("flash");
                console.log("remove flash");
            }, 900);

            //--play the appropriate countdown sfx
            console.log("play sfx "+countdownNum);
            document.getElementById("countdown-"+newCountdownNum+"-sfx").play();

            if(countdownNum > 1){
                //--show a new question - after the animation is finished
                console.log("set a new question in a bit");
                setTimeout(function() {
                    showNewQuestion();
                }, 1250);
            } else {
                //--game completed
                console.log("lift off!");
                $(".rocket").addClass("rocket--active");
                $(".question-container").removeClass("question-container--active");
                document.getElementById("rocket-launch-sfx").play();

                setTimeout(function() {
                    $(".reset-button").show();
                }, 100);

                $(".win-message").addClass("win-message--active");

                setTimeout(function() {
                    $(".win-message").removeClass("win-message--active");
                }, 100);
            }
        }, correctAnimLength);

    } else {
        console.log("This is wrong");
        $(btn).addClass("answer--wrong");

        setTimeout(function() {
            $(btn).removeClass("answer--wrong");
        }, 1000);
    }
}

function reset(){
    $(".reset-button").hide();

    startGame();
}