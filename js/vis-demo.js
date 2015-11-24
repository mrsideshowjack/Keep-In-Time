$(function(){
  var container = document.getElementById('visualization');

  // Create a DataSet (allows two way data-binding)
  var items = new vis.DataSet([
    {id: 1, content: 'item 1', start: '2015-11-20'},
    {id: 2, content: 'item 2', start: '2015-11-14'},
    {id: 3, content: 'item 3', start: '2015-11-18'},
    {id: 4, content: 'item 4', start: '2015-11-09', end: '2015-11-22'},
    {id: 5, content: 'item 5', start: '2015-11-25'},
    {id: 6, content: 'item 6', start: '2015-11-27', group: 1}
  ]);

  var groups = [
  {
    id: 1,
    content: 'Group 1'
    // Optional: a field 'className', 'style'
  }
  // more groups...
]);


  // Configuration for the Timeline
  var options = {
      editable: true,
  	 height: '500px',
  };

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, options);
});