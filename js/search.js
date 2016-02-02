function result(str,  process1) {
    
    
    var xhr = new XMLHttpRequest();

    
    xhr.onreadystatechange = function()
    {
     
        if (xhr.readyState == 4 && xhr.status == 200)
            {
                process1(xhr.response);
                
            }
    }
        xhr.open("GET", "dbSearch.php?querry="+str, true);
        xhr.send();
    
}
