 //http://jsfiddle.net/syahrasi/us8uc/
 $(document).ready(function() {
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("active");
        $(this).parent().siblings().removeClass("active");
        var tab = $(this).attr("href");
        $(".content-section").not(tab).css("display", "none");
        $(tab).fadeIn("fast");
    });
});