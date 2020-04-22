//--from here: https://codepen.io/gavra/pen/tEpzn
$(document).ready(function() {

    var aText = $("#typewriter-text").text();
    var iSpeed = 100; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText.length; // the length of the text array
    var iScrollAt = 20; // start scrolling up at this many lines
    var iTextPos = 0; // initialise text position
    var sContents = ''; // initialise contents variable
    var iRow; // initialise current row

    setTimeout(function() {
        typewriter();
    }, 3000);

    function typewriter()
    {
        sContents =  ' ';
        iRow = Math.max(0, iIndex-iScrollAt);
        var destination = $("#typewriter-destination");
        console.log("length = "+iArrLength);

        while ( iRow < iIndex ) {
            sContents += aText[iRow++] + '<br />';
        }

        destination.text(sContents + aText[iIndex].substring(0, iTextPos));
        if ( iTextPos++ == iArrLength ) {
            iTextPos = 0;
            iIndex++;
            if ( iIndex != aText.length ) {
                iArrLength = aText[iIndex].length;
                setTimeout(function() {
                    typewriter();
                }, 500);
            }
        } else {
            setTimeout(function() {
                typewriter()
            }, iSpeed);
        }
    }

});




