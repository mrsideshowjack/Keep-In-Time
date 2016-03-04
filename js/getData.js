//should ultimately get stuff from the database

//call to get the tasks
//can be used for the node dataset
function getWBT(project) {
  getData(project, "tasks", logData)
  getData(project, "wbt", logData)
}

/*
 This function has been moved to pert-visualization(withnode).js

function getPERT(project,which) {
  if(which =="tasks")
  {
    getData(project, "tasks", logData2);
  }
  else {
    getData(project, "pert", logData);
  }

}
*/


function getGantt(project) {
  getData(project, "tasks", logData)
  //getData(project, "pert", logData)
}


function getData(project, field, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){
      callback(xhr.response);
    }
  }
  xhr.open("GET", "php/dbget.php?project="+project+"&field="+field, true);
  xhr.send();
}


function logData(data) {
console.log(data)
}

function postWBT(project, data) {
  postData(project, data, "tasks");
  postData(project, data,  "wbt");
}

function postPERT(project, data,which) {
  if(which =="tasks")
  {
    postData(project, data, "tasks");
  }
  else {
    postData(project, data, "pert");
  }
}

function postGANTT(project, data) {
  postData(project, data, "tasks");
  //postData(project, data, "pert");
}

function postData(project, data, field) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){
      logData(xhr.response);
    }
  }
  xhr.open('POST', "php/dbpost.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var postStr ="project="+project + "&field="+field + "&data="+data;
  xhr.send(postStr);
}

function newProject(projectName) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){
      logData(xhr.response);
    }
  }
  xhr.open('POST', "php/new.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  var postStr ="name="+projectName;
  xhr.send(postStr);
}
