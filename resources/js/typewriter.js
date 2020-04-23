$(document).ready(function() {

    /*
      Split text into lines and characters.
      Each character will have class of "char"
      Each line will have a class of "line"
    */
    instructionInstance = new SplitType('.split-type-chars',{
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
                instructionInstance.revert();
            }, (initialDelay)*2000);

        });
    }, (initialDelay)*1000);



});