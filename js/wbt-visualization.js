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
  var options = {
                layout: {
                    hierarchical: {
                        direction: 'LR'
                    }
                }
            };
  var network = new vis.Network(container, data, options);
 console.log("HI");