var nodes = null;
var edges = null;
var network = null;
var turnON = false;
var DIR = 'img/refresh-cl/';
var LENGTH_MAIN = 150;
var LENGTH_SUB = 50;
var svg;
var url;
var nodes = new Array();
var  edges = [];
var items;
var ids;
var edgesArray;
var objP;

// this varaiable calls a project by it's id,
// so you can change the value of this varaiable to the id number of the project you want to call.
// at the moment it's calling a project with the id 1
var projectChartId = 1;


getPERT(projectChartId);

function getPERT(project,which)
{
  getData(project, "tasks", getPertData);
  //getData(project, "pert", lnm);
}

function getPertData(data)
{
  var b = JSON.parse(data)
  console.log(b[0].tasks);
  var arrayData = [];
  var stringData ="";
  var vb = JSON.parse(b[0].tasks);
  console.log("vb: "+ JSON.stringify(vb));
  for (var key in vb) {
    if (vb.hasOwnProperty(key)) {
      var obj = vb[key];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
        {
          if(prop == "id")
          {
            stringData=prop + ":" + obj[prop]+",";
          }
          else if (prop == "slack") {
            stringData+=prop + ":" + obj[prop];
          }
          else if (prop == "start") {
            //stringData+=prop + ":" + obj[prop]+",";
          }
          else if (prop == "x"||prop == "y"||prop == "label") {
            //stringData+=prop + ":" + obj[prop]+",";
          }
          else
          {
            if(isNaN(prop))
            {
              stringData+=prop + ":" + obj[prop]+",";
            }
            else {}
          }
        }

      }
      //console.log(me);
      console.log("stringData: "+stringData);
      var objn = splitter(stringData,false)
      arrayData.push(objn);
    }

  }
  console.log("arrayData: "+JSON.stringify(arrayData));
  //items = new vis.DataSet([JSON.parse(b[0].tasks)])
  items = new vis.DataSet(arrayData);
  getData(projectChartId, "pert", getPertEdges);
}

function getPertEdges(data)
{
  //items = new vis.DataSet([data]);
  var set = JSON.parse(data);
  //console.log(set[0].pert);

  var set = JSON.parse(set[0].pert);
  console.log(set);
  vbn(set);

  edges = new vis.DataSet(edgesArray);
  ids = items.getIds();
  createNode();
  draw();
  var ok = edges;
}

function vbn(set)
{
  edgesArray = [];
  var edgesList;
  var vb = set;
  for (var key in vb) {
    if (vb.hasOwnProperty(key)) {
      var obj = vb[key];
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop))
        {
          if(prop == "from")
          {
            edgesList=prop + ":" + obj[prop]+",";
          }
          else if (prop == "to")
          {
            edgesList+=prop + ":" + obj[prop];
          }
          else
          {
            if(isNaN(prop))
            {

            }

          }
        }
      }
      console.log(edgesList);
    objP = splitter(edgesList,true)
    edgesArray.push(objP);
  }
}}


function splitter(string,pass)
{
  var properties = string.split(',');
  var obj = {};
  properties.forEach(function(property) {
    var tup = property.split(':');
    if(pass)
    {
      //obj[tup[0]] = parseInt(tup[1]);
      obj[tup[0]] = tup[1];
    }
    else {
      if(obj[tup[0]] == "id")
      {
        obj[tup[0]] = parseInt(tup[1]);
      }
      else {
        obj[tup[0]] = tup[1];
      }

    }

  });
  return obj;
}

var ids = items.getIds(); // returns an array of all the ids of the items in the dataset
console.log(ids);
console.log(ids.length);



function image(item)
{
  return '<svg xmlns="http://www.w3.org/2000/svg" width="550" height="200">' +
  '<rect x="0" y="0" width="100%" height="100%" fill="#fff" stroke-width="20" stroke="#ffffff" ></rect>' +
  '<foreignObject x="15" y="10" width="100%" height="100%">' +
  '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
  "<table> <tr><td>" + item.eStart + "</td> <td> "+ item.duration +  "</td> <td>" + item.eFinish+ "</td> " +
  "</tr> <tr> <td colspan='3'> " + item.description + "</td> </tr><tr> <td> " + item.lStart + "</td> <td> " + item.slack + " </td>"  +
  "<td> " + item.lFinish + " </td> </tr> <style> td{ border:solid; } </style> </table>" +
  "</div>"+
  '</foreignObject>' +
  '</svg>';

}


var DOMURL = window.URL || window.webkitURL || window;

var img = new Image();
//var svg = new Blob([makeImage(item)], {type: 'image/svg+xml;charset=utf-8'});

// Taken from https://stackoverflow.com/questions/5223/length-of-a-javascript-object-that-is-associative-array
Object.size = function(obj) { ///FUCK THIS SHITDOSENT EVEN FUCKING WORK
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++; /// P.S NOt using this function any more made a better one BITCH
  }
  return size;
};



function createNode()// adds nodes to the array used on first run
{

  //console.log("nodes");
  for(i = 0; i < ids.length; i++)
  {
    addPertNode(ids[i]);
  }
  //console.log(nodes);

  return nodes;
}

function addPertNode(id)// creates a node for the node arrays to be drawn
{
  //console.log("hi");
  var item = items.get(id);
  console.log(item);
  nodes.push({id:id, image: create(item), shape: 'image' });
}

function create(item)
{
  svg = new Blob([image(item)], {type: 'image/svg+xml;charset=utf-8'});
  return url = DOMURL.createObjectURL(svg);
}


// Called when the Visualization API is loaded.
function draw() {

  console.log("draw");
  // Create a data table with nodes.

  //edges = [];

  var container = document.getElementById('pert-visualization');
  var data = {
    nodes: nodes,
    edges: edges
  };

  network = new vis.Network(container, data, options);
  console.log("pert");
}

var options = {
  layout: {
    hierarchical: {
      enabled: false,
      direction: 'LR',
      sortMethod: 'hubsize'
    }
  },
  physics: {enabled: false},
  interaction:{
    dragNodes:true,
    dragView: true,
    hover: true,
    hoverConnectedEdges: true,
    keyboard: {
      enabled: true,
      speed: {x: 10, y: 10, zoom: 0.02},
      bindToWindow: true
    },
    multiselect: true,
    navigationButtons: true,
    selectable: true,
    selectConnectedEdges: true,
    tooltipDelay: 300,
    zoomView: true
  },
  manipulation: {
    enabled: true,
    initiallyActive: true,
    addNode: function(nodeData,callback)
    {

      addPert(nodeData,callback);
    },
    editNode: function(nodeData,callback)
    {
      console.log(nodeData['id']);
      var item = items.get(nodeData['id']);
      updatePert(item, callback)
    },
    addEdge: function(nodeData,callback)
    {
      saveEdges(nodeData,callback);
      // update the task in the database after the user has made a change to the task
      var storeTask = edges._data;
      postPERT(projectChartId,JSON.stringify(storeTask),"pert");
    },

    //editNode: true,
    editEdge: function(nodeData,callback)
    {
      editEdgeNow(nodeData,callback);
      var storeEdges = edges._data;
      postPERT(projectChartId,JSON.stringify(storeEdges),"pert");
    },
    deleteNode:function(nodeData,callback)
    {
      removNodeDel(nodeData,callback);
      var storeTask = items._data;
      var storeEdges = edges._data;
      postPERT(projectChartId,JSON.stringify(storeEdges),"pert");
      postPERT(projectChartId,JSON.stringify(storeTask),"tasks");
    },
    deleteEdge: function(nodeData,callback)
    {
      deleteEdgeNow(nodeData,callback);
      var storeEdges = edges._data;
      postPERT(projectChartId,JSON.stringify(storeEdges),"pert");
    },
    controlNodeStyle:{
      // all node options are valid.
    },

  },

  "edges": {
    smooth: false,
    "arrows": {
      "to": {
        "enabled": false
      }
    }
  },
};

function saveEdges(nodeData,callback)
{
  console.log(nodeData);
  edges.add(nodeData);
}

function editEdgeNow(nodeData,callback)
{
  console.log(nodeData);
  callback(nodeData);
}

function deleteEdgeNow(nodeData,callback)
{
  console.log(nodeData);
  callback(nodeData);
}
function removNodeDel(nodeData,callback)
{
  console.log(nodeData);
  console.log(nodeData.nodes[0]);
  var removeNode = items._data[nodeData.nodes[0]];
  nodeRemover(removeNode);
  callback(nodeData);

}
function updatePert(item, callback)
{
  turnON = false;
  redirect("moreItems");
  iName = __("itemName").value = item.description;
  iStart = __("itemStart").value = item.eStart;
  iEnd = __("itemEnd").value = item.eFinish;
  lStart = __("itemlStart").value = item.lStart;
  End = __("itemlEnd").value = item.lFinish;

  editPert(item, callback);
}


function addPert(item,callback)
{
  emptyInput();
  console.log(item);
  items.add(item);
  console.log(item['id']);
  item = items.get(item['id']);
  turnON = true;
  redirect("moreItems");
  editPert(item, callback);
}

function nodePush(item)
{
  nodes.push({id:item.id, image: create(item), shape: 'image' });
  draw();
  console.log("adder");
  items.remove(item.id);
  items.add(item);
}

function nodeRemover(item)
{
  var indexes = nodes.map(function(obj, index) {
    if(obj.id == item.id) {
      return index;
    }
  }).filter(isFinite)
  console.log("Updating index: "+indexes);
  items.remove(item.id);
  nodes.splice(indexes,1);
}

function nodeRemove(item)
{
  nodeRemover(item);
  console.log(item.id);
  nodes.push({id:item.id, image: create(item), shape: 'image' });
  items.add(item);
  draw();
}

/*
*This function gets the item and callback info from the user to vis.js
* editPert(item,callback)
*/
function editPert(item, callback)
{
  document.getElementById("closeForm").onclick = function()
  {callback(null);
  }

  __("pertExtra").style.display = "block";
  document.getElementById("done").onclick = function()
  {
    iName = __("itemName").value;
    iStart = __("itemStart").value ;
    iEnd = __("itemEnd").value;
    lStart = __("itemlStart").value;
    lEnd = __("itemlEnd").value;
    item.description = iName;
    item.eStart = iStart;
    item.eFinish = iEnd;
    item.duration = daysOn(iStart,iEnd);
    item.lStart = lStart;
    item.group = 1;
    item.lFinish = lEnd;
    item.slack = daysOn(iEnd,lEnd);//Slack
    item.start = breakDates(iStart);

    console.log(item);


    if (item.description !== null) {
      callback(item); // send back adjusted item
      if(turnON)
      {
        nodePush(item);
      }
      else {
        nodeRemove(item);
      }

      emptyInput();
      redirect("");
    }

    else {

      callback(null); // cancel updating the item
    }
    // update the task in the database after the user has made a change to the task
    var storeTask = items._data;
    postPERT(projectChartId,JSON.stringify(storeTask),"tasks");
  }
}

/*
*This function splits the date gvin by the user into 3 array
*It then create a new date from the array
* breakDates(str)
*/
function breakDates(str)
{
  var mdy = str.split('-')
  //return new Date(mdy[2], mdy[1]-1, mdy[0]);
  return new Date(mdy[0], mdy[1]-1, mdy[2]);
}

/*
*This function calculate how many dates are in the dates given by the user
*It then retur the days
* returns daysOn(start,end)
*/
function daysOn(start,end)
{
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var startDate = breakDates(start);
  var endDate = breakDates(end);
  var diffDays = Math.round(Math.abs((startDate.getTime() - endDate.getTime())/(oneDay)));
  return diffDays + " Days";
}

createNode();
draw();
