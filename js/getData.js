//should ultimately get stuff from the database

//call to get the tasks
//can be used for the node dataset
function getDataSet(project) {
  return getData(project, "tasks");
}

//call to get the wbt edges
function getEdgesWBT(project) {
  return getData(project, "wbt");
}

//call to get the PERT chart edges
//can also be used for Gantt chart prereqs.
function getEdgesPERT(project) {
  return getData(project, "pert");
}


function getData(project, "data") {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200){
      process(xhr.response);
    }
  }

  xhr.open("GET", "whatever.php?project="+project+",data="+data, true);
  xhr.send();
}
