        var nodes = null;
        var edges = null;
        var network = null;

        var DIR = 'img/refresh-cl/';
        var LENGTH_MAIN = 150;
        var LENGTH_SUB = 50;
        var svg;
        var url;
         var nodes = [];
        var    edges = [];

var items = new vis.DataSet([
        {id: 0, group: 0, description: 'some bull shit', start: new Date(2014, 3, 17), eStart: '2014/3/17', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/17',  lFinish: '2014/4/20', slack: '10 Days'},
        {id: 1, group: 0, description: 'some bull shit1', start: new Date(2014, 3, 19), eStart: '2014/3/19', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/19',  lFinish: '2014/4/20', slack: '10 Days'},
        {id: 2, group: 1, description: 'some bull shit2', start: new Date(2014, 3, 16), eStart: '2014/3/16', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/16',  lFinish: '2014/4/20', slack: '10 Days'},
        {id: 3, group: 1, description: 'some bull shit3', start: new Date(2014, 3, 23), eStart: '2014/3/23', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/23',  lFinish: '2014/4/20', slack: '10 Days'},
        {id: 4, group: 1, description: 'some bull shit4', start: new Date(2014, 3, 22), eStart: '2014/3/22', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/22',  lFinish: '2014/4/20', slack: '10 Days'},
        {id: 5, group: 2, description: 'some bull shit5', start: new Date(2014, 3, 24), eStart: '2014/3/24', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/24',  lFinish: '2014/4/20', slack: '10 Days'}
        ]);
//var item =  {id: 0, group: 0, description: 'some bull shit', start: new Date(2014, 3, 17), eStart: '2014/3/17', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/17',  lFinish: '2014/4/20', slack: '10 Days'};


function dataz(item)
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
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

console.log(Object.size(items));
        
function createNode()// adds nodes to the array 
            {
                nodes = [];
                console.log("nodes");
                for(i = 0; i < Object.size(items); i++)
                    { 
                        console.log("hi");
                     var item = items.get(i);
                        console.log(item);
                        
                        nodes.push({id:i, image: create(item), shape: 'image' });
                    }
                console.log(nodes);
                return nodes;
            }

function addNode()
{
    
    
}

function create(item)
{
     svg = new Blob([dataz(item)], {type: 'image/svg+xml;charset=utf-8'});
     return url = DOMURL.createObjectURL(svg);
}

        // Called when the Visualization API is loaded.
        function draw() {
            console.log("draw");
            // Create a data table with nodes.
            nodes = createNode(nodes);;
            edges = [];
            //createNodes(nodes);
            // Create a data table with links.
            /*
            
            a = items.get(1);
            console.log(a);
            nodes.push({id: 1, image: create(items.get(1)), shape: 'image'});
            nodes.push({id: 2, image: create(items.get(1)), shape: 'image'});
            edges.push({from: 1, to: 2, length: 300});
            */
          
            // create a network
            var container = document.getElementById('pert-visualization');
            var data = {
                nodes: nodes,
                edges: edges
            };

            network = new vis.Network(container, data, options);
            console.log("pert");
        }

            var options = {
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
      addPert(nodeData, callback)
    },
    editNode: function(nodeData,callback)
    {
        console.log(nodeData['id']);
        var item = items.get(nodeData['id']);
      updatePert(item, callback)
    },
    addEdge: true,
    //editNode: true,
    editEdge: true,
    deleteNode: true,
    deleteEdge: true,
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

function updatePert(item, callback)
{
      
  redirect("moreItems");
  iName = __("itemName").value = item.description;
  iStart = __("itemStart").value = item.eStart;
  iEnd = __("itemEnd").value = item.eFinish;
  lStart = __("itemlStart").value = item.lStart;
  End = __("itemlEnd").value = item.lFinish;

  editPert(item, callback);
}


function addPert(item, callback)
{
  emptyInput();

  redirect("moreItems");
  editPert(item, callback);
}

/*
*This function gets the item and callback info from the user to vis.js
* editPert(item,callback)
*/
function editPert(item, callback)
{

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
    item.lFinish = lEnd;
    item.slack = daysOn(iEnd,lEnd);//Slack
    item.start = breakDates(iStart);

    if (item.content != null) {
      callback(item); // send back adjusted item
      console.log(items);
      emptyInput();
      redirect("");
    }
    else {
      callback(null); // cancel updating the item
    }
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

///createNodes();
draw();