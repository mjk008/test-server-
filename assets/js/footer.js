


function searchNow(){
    if($("#inputString").val().length > 3 && $("#inputString").val() != "Search"){
        $("#formSearch").submit();
    }else{
        alert('You have to type minimum 3 characters to proceed with search');
    }
}

$(".parento").hoverIntent(
    function(){
        $(".parento").children('ul').slideUp('15600','jswing');
        $(this).children('ul').slideDown('15600','jswing');
    },
    function(){
        $(".parento").children('ul').slideUp('15600','jswing');
    });

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-33480636-1']);
_gaq.push(['_setDomainName', 'zebronics.com']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
})();
    
    
var timer = null;
    
$(document).ready(function(){
        
        
    $('#inputString').typeahead({
        highlight : true,
        source: function (typeahead, query) {
            if(query.length >= 3){
                return $.post('/search/type-ahead/format/html', {
                    query: query
                }, function (data) {
                    data = $.parseJSON(data);
                    return typeahead.process(data);
                });
            }else{
                return "";
            }
        }
    });         
        
    $(".home").hoverIntent(
        function(){
            $("#productSubMenu").height("auto");
            $("#productSubMenu").fadeIn('1000');
            $("#productSubMenu").find("table").animate({
                'marginTop': "0px"
            }, "2000" , "jswing");
        },
        function(){
            timer = setTimeout(function(){
                $("#productSubMenu").slideUp('500');
                $("#productSubMenu").find("table").stop().animate({
                    'marginTop': "-400px"
                }, "20000" , "jswing");
                $(".home a").removeClass("act");
            }, 700);
        });                
        
    
    $("#productSubMenu").mouseover(function(){
        clearTimeout(timer); 
        $('.home a').addClass('act');
    });
    $("li.home").mouseover(function(){
        clearTimeout(timer); 
        $('.home a').addClass('act');
    });        
//$(".megamenu").megamenu();
});
