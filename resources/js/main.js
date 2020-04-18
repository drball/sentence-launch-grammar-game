var questionNum = 0;

var questions = [{
    question: "The answer is 1",
    answer: "Statement"
}, {
    question: "The answer is 2",
    answer: "Question"
}, {
    question: "Answer is 3",
    answer: "Command"
}, {
    question: "Answer is 4",
    answer: "Exclamation"
}];

$(document).ready(function() {

    $(".reset-button").hide();


});

function playButtonPressed() {

    console.log("pressed");

    var game = $(".game");

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
    $(".countdown").text(10);
    $(".question-container").addClass("question-container--active");
    $(".rocket").removeClass("rocket--active");
    showNewQuestion();
}

function showNewQuestion(){

    //--random question - but NOT the last one
    questionNum = Math.floor(Math.random() * questions.length);

    //--show the question
    $(".question").text(questionNum + questions[questionNum].question);

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

}

$('.answer').click(function() {

    //--check answer
    console.log($(this).data("type"));
});

function answerPressed(btn){

    if($(btn).hasClass("answer--correct-answer")){
        console.log("thisis right!");
        $(btn).addClass("answer--right");

        var countdown = $("#countdown");

        console.log("countdown = "+countdown.text());

        var countdownNum = parseInt(countdown.text());

        countdown.text(countdownNum-1);

        if(countdownNum > 1){
            showNewQuestion();
        } else {
            //--game completed
            console.log("lift off!");
            $(".rocket").addClass("rocket--active");
            $(".question-container").removeClass("question-container--active");

            setTimeout(function() {
                $(".reset-button").show();
            }, 100);

            $(".win-message").addClass("win-message--active");

            setTimeout(function() {
                $(".win-message").removeClass("win-message--active");
            }, 100);
        }

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