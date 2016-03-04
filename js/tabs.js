 //http://jsfiddle.net/syahrasi/us8uc/
 $(document).ready(function() {
    $(".tabs-menu a").click(function(event) {
        event.preventDefault();
        $(this).parent().addClass("active");//sets the a that was clicked to active class
        $(this).parent().siblings().removeClass("active");//removes this class to all siblings
        var tab = $(this).attr("href");//finds the tab content-section that matches the href you clicked
        $(".content-section").not(tab).css("display", "none");//sets all other content-section tabs to display none
        $(tab).fadeIn("fast");

        var title = $(this).text();//getting the text of the clicked tab
        $("#tab-title").text(title); //replaceing the title text with the tab text
        
    });
});