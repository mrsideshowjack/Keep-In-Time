// create an array with nodes
var nodes = new vis.DataSet([
  {id: 1, label: 'Node 1'},
  {id: 2, label: 'Node 2'},
  {id: 3, label: 'Node 3'},
  {id: 4, label: 'Node 4'},
  {id: 5, label: 'Node 5'}
]);

// create an array with edges
var edges = new vis.DataSet([
  {from: 1, to: 3, arrows:'to'},
  {from: 1, to: 2, arrows:'to'},
  {from: 2, to: 4, arrows:'to'},
  {from: 2, to: 5, arrows:'to'}
]);

// create a network
var container = document.getElementById('wbt-visualization');
var data = {
  nodes: nodes,
  edges: edges
};

function addNode(nodeData,callback) {
  var name = document.getElementById("name").value;

  if (name != "")
  {
    nodeData.label = name;
    console.log(nodes);
    console.log(edges);
    callback(nodeData);
  }
  else
  {
    callback(null);
    alert("Please enter a name into the box bellow");
  }
}


var options = {

physics:{
    enabled: false,
    stabilization: false,
},
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
      addNode(nodeData,callback)
    },
    editNode: function(nodeData,callback)
    {
      addNode(nodeData,callback)
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
        "enabled": true
      }
    }
  },

};

var network = new vis.Network(container, data, options);
console.log("HI");

function wbtAdd()
{
  var name = document.getElementById("name").value;
  var conect = document.getElementById("joinsTo").value;
  nodes.add


}
