 var items = new vis.DataSet([
    {id: 'A', content: 'Period A', start: '2014-01-16', end: '2014-01-22', type: 'background'},
    {id: 'B', content: 'Period B', start: '2014-01-25', end: '2014-01-30', type: 'background', className: 'negative'},
    {id: 1, content: 'item 1<br>start', start: '2014-01-23'},
    {id: 2, content: 'item 2', start: '2014-01-18'},
    {id: 3, content: 'item 3', start: '2014-01-21'},
    {id: 4, content: 'item 4', start: '2014-01-19', end: '2014-01-24'},
    {id: 5, content: 'item 5', start: '2014-01-28', type:'point'},
    {id: 6, content: 'item 6', start: '2014-01-26'}
  ]);

  var container = document.getElementById('gantt-visualization');
  var options = {
    start: '2014-01-10',
    end: '2014-02-10',
    editable: true
  };

  var timeline = new vis.Timeline(container, items, options);

