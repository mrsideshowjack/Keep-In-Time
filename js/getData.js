//should ultimately get stuff from the database

//call to get the tasks
//can be used for the node dataset

function getWBT(project) {
  getData(project, "tasks", updateTasks, logData)
  getData(project, "wbt", updateWBTEdges, logData)
}

function getPERT(project) {
  getData(project, "tasks", updateTasks, logData)
  getData(project, "pert", updatePERTEdges, logData)
}

function getGantt(project) {
  getData(project, "tasks", updateTasks, logData)
  getData(project, "pert", updatePERTEdges, logData)
}


function getData(project, field, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){
      logData(xhr.response);
    }
  }
  xhr.open("GET", "php/dbget.php?project="+project+"&field="+field, true);
  xhr.send();
}

function logData(data) {
	console.log(data);
}

function postWBT(project, data) {
  postData(project, data, "tasks");
  postData(project, data,  "wbt");
}

function postPERT(project, data) {
  postData(project, data, "tasks");
  postData(project, data, "pert");
}

function postPERT(project, data) {
  postData(project, data, "tasks");
  postData(project, data, "pert");
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
