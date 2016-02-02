getProjectInfo();

function __(id)
{
  return document.getElementById(id);
}

function getProjectInfo()
{
  __("projectBTN").onclick = function()
  {
    var projectName = __("Name").value;
    var projectDesc = __("discription").value;
    if(projectName != "" && projectDesc != "")
    {
      var url ='php/newProject.php?ProjectName='+projectName+'&ProjectDesc='+projectDesc;
      getProjectId(url);
    }
    else
    {
      alert("Please fill in the box");
    }
  }
}

function getProjectId(url)
{
  xhrCallRequest(url,function (result)
  {
    var obj = JSON.parse(result);
    redirectPage(obj.id);
  });
}


function redirectPage(id)
{
  window.location = "app.html?id="+id;
}


function xhrCallRequest(url,callback)
{
  var xhr, success, failure,obj;
  xhr = new XMLHttpRequest();

  success = function ()
  {
    callback(xhr.responseText);
  };

  failure = function ()
  {
    console.log("Something went wrong");
  };

  xhr.open("GET",url,true);
  xhr.onload = success;
  xhr.onerror = failure;
  xhr.send();

};
