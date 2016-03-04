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
  var container = document.getElementById('pert-visualization');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
                layout: {
                    hierarchical: {
                        direction: 'LR'
                    }
                },

            };
  var network = new vis.Network(container, data, options);
 console.log("HI");


 /*var items = new vis.DataSet([
 {id: 0, group: 0, description: 'some bull shit', start: new Date(2014, 3, 17), eStart: '2014-3-17', eFinish: '2014-4-20', duration: '14 Days', lStart: '2014-3-17',  lFinish: '2014-4-20', slack: '10 Days'},
 {id: 1, group: 0, description: 'some bull shit1', start: new Date(2014, 3, 19), eStart: '2014-3-19', eFinish: '2014-4/20', duration: '14 Days', lStart: '2014-3-19',  lFinish: '2014-4-20', slack: '10 Days'},
 {id: 2, group: 1, description: 'some bull shit2', start: new Date(2014, 3, 16), eStart: '2014-3-16', eFinish: '2014-4-20', duration: '14 Days', lStart: '2014-3-16',  lFinish: '2014-4-20', slack: '10 Days'},
 {id: 3, group: 1, description: 'some bull shit3', start: new Date(2014, 3, 23), eStart: '2014-3-23', eFinish: '2014-4-20', duration: '14 Days', lStart: '2014-3-23',  lFinish: '2014-4-20', slack: '10 Days'},
 {id: 4, group: 1, description: 'some bull shit4', start: new Date(2014, 3, 22), eStart: '2014-3-22', eFinish: '2014-4-20', duration: '14 Days', lStart: '2014-3-22',  lFinish: '2014-4-20', slack: '10 Days'},
 {id: 5, group: 2, description: 'some bull shit5', start: new Date(2014, 3, 24), eStart: '2014-3-24', eFinish: '2014-4-20', duration: '14 Days', lStart: '2014-3-24',  lFinish: '2014-4-20', slack: '10 Days'},
 {id: 24, group: 2, description: 'some bull shit6', start: new Date(2014, 3, 24), eStart: '2014-3-24', eFinish: '2014-4-20', duration: '14 Days', lStart: '2014-3-24',  lFinish: '2014-4-20', slack: '10 Days'},
 {id: 26, group: 2, description: 'some bull shit7', start: new Date(2014, 3, 24), eStart: '2014-3-24', eFinish: '2014-4-20', duration: '14 Days', lStart: '2014-3-24',  lFinish: '2014-4-20', slack: '10 Days'}
 ]);
 */
 //var item =  {id: 0, group: 0, description: 'some bull shit', start: new Date(2014, 3, 17), eStart: '2014-3-17', eFinish: '2014-4-20', duration: '14 Days', lStart: '2014-3-17',  lFinish: '2014-4-20', slack: '10 Days'};

 /*
 edges = new vis.DataSet([
 {from: 0, to: 2},
 {from: 2, to: 4},
 {from: 4, to: 1},
 {from: 2, to:5 },
 {from: 5, to: 24},
 {from: 24, to: 27},
 {from: 27, to: 3},
 {from: 1, to: 0},
 {from: 24, to: 3},
 {from: 4, to: 26},
 {from: 26, to: 3}

 ]);*/
