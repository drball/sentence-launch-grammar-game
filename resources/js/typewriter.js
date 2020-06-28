$(document).ready(function() {

    /*
      Split text into lines and characters.
      Each character will have class of "char"
      Each line will have a class of "line"
    */
    startInstructionInstance = new SplitType('.start-instruction .split-type-chars',{
        split: 'chars,lines'
    });

    var initialDelay = 2.5;

    setTimeout(function() {

        $(".start-instruction").each(function( index ) {

            var chars = $(this).find(".char").toArray();

            var duration = 0.06;

            TweenMax.staggerTo(chars, 0.2, {opacity: 1, ease: Linear.easeNone}, duration);

            //--revert to normal text after animation has finished
            setTimeout(function(){
                startInstructionInstance.revert();
            }, (initialDelay)*2000);

        });

    }, (initialDelay)*1000);


});



function answersInstructionTypewriter(){

    var initialDelay = 4;

    answersInstructionInstance = new SplitType('.answers-instruction .split-type-chars',{
        split: 'chars,lines'
    });

    setTimeout(function() {

        $(".answers-instruction").each(function( index ) {

            var chars = $(this).find(".char").toArray();

            var duration = 0.06;

            TweenMax.staggerTo(chars, 0.2, {opacity: 1, ease: Linear.easeNone}, duration);

            //--revert to normal text after animation has finished
            setTimeout(function(){
                answersInstructionInstance.revert();
            }, (initialDelay)*2000);

        });
    }, (initialDelay)*1000);
}

