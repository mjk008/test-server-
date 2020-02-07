
var viewportHeight = $(window).height();
var timeoutID;


$(window).resize(function() {
viewportHeight = $(window).height();
//noOfWraps = $(".headerwrap").length;



if ( $("#mainwrap").is(":visible") ) {
    $("#restwrap").css("margin-top",viewportHeight);
    $(".headerwrap").css("width","100%");
    $(".headerwrap").css("height",viewportHeight);
}

});


 
/*-----------------------------------------------------------------------------------*/
$(document).ready(function(){
       
     
     $(window).resize();
     
     
    //$("body").niceScroll({
    //  cursorcolor: '#202020',
    //  cursorwidth: 5,
    //  cursorborderradius: 0,
    //  cursorborder: '0px solid #fff',
    //  zindex: 10
    //});
});