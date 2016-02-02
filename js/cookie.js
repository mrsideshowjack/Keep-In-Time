var d = new Date();
var getCTime = d.getTime();
var project = getCookie("projects");
var jsonStr;
var obj;

if(project !="")
{
  var jsonStr = project;
  var obj = JSON.parse(jsonStr);
}

function __(id)
{
  return document.getElementById(id);
}

function setCookie(cname, cvalue, exdays) {
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
  }
  return "";
}

/*function redirect(id)
{
  window.location = "app.html?id="+id;
}*/

if(__("projectBTN") != null)
{
  __("projectBTN").onclick = function()
  {
    var projectName = __("Name").value;
    var projectDesc = __("discription").value;
    if(project!="")
    {
      obj['project'].push({"id":getCTime,"name":projectName,"description":projectDesc});
      jsonStr = JSON.stringify(obj);
    }
    else
    {
      jsonStr = '{"project":[{"id":"'+getCTime+'","name":"'+projectName+'","description":"'+projectDesc+'"}]}';
    }
    setCookie("projects", jsonStr, 5);
    redirect(getCTime);
  }
}

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function appInfo()
{
  var select = document.getElementById("projectsName");
  var getcurrentid = getParameterByName("id");
  obj.project.forEach(function(entry)
  {
    console.log(entry);

    var opt = document.createElement('option');
    opt.value = entry.id;
    opt.id = entry.id;
    opt.innerHTML = entry.name;
    select.appendChild(opt);
    if(entry.id == getcurrentid)
    {
      __(getcurrentid).selected = "true";
    }
  });
}


if(__("projectsName") != null)
{
__("projectsName").onchange = function()
{
  var sel = __("projectsName");
  var url = sel.options[sel.selectedIndex].value;
  redirect(url);
}
}

if(getParameterByName("id") !="")
{
  appInfo();
}
