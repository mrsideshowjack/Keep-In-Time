function __(id)
{
  return document.getElementById(id);
}


 var container = document.getElementById('pert-visualization');

  var items = new vis.DataSet([
    {id: 0, group: 0, description: 'some bull shit', start: new Date(2014, 3, 17), eStart: '2014/3/17', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/17',  lFinish: '2014/4/20', slack: '10 Days'},  
    {id: 1, group: 0, description: 'some bull shit', start: new Date(2014, 3, 19), eStart: '2014/3/19', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/19',  lFinish: '2014/4/20', slack: '10 Days'},  
    {id: 2, group: 1, description: 'some bull shit', start: new Date(2014, 3, 16), eStart: '2014/3/16', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/16',  lFinish: '2014/4/20', slack: '10 Days'},  
    {id: 3, group: 1, description: 'some bull shit', start: new Date(2014, 3, 23), eStart: '2014/3/23', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/23',  lFinish: '2014/4/20', slack: '10 Days'},  
    {id: 4, group: 1, description: 'some bull shit', start: new Date(2014, 3, 22), eStart: '2014/3/22', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/22',  lFinish: '2014/4/20', slack: '10 Days'},  
    {id: 5, group: 2, description: 'some bull shit', start: new Date(2014, 3, 24), eStart: '2014/3/24', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/24',  lFinish: '2014/4/20', slack: '10 Days'}  
  ]);

  var items2 = new vis.DataSet([
    {id: 0, group: 0, content: 'item 0', start: new Date(2014, 3, 17)},
    {id: 1, group: 0, content: 'item 1', start: new Date(2014, 3, 19)},
    {id: 2, group: 1, content: 'item 2', start: new Date(2014, 3, 16)},
    {id: 3, group: 1, content: 'item 3', start: new Date(2014, 3, 23)},
    {id: 4, group: 1, content: 'item 4', start: new Date(2014, 3, 22)},
    {id: 5, group: 2, content: 'item 5', start: new Date(2014, 3, 24)}
  ]);



  var iName; var iStart; var iEnd;

   var options =
   {
    onAdd: function(item, callback)
    {
      addNewGantt(item, callback)
    },
    onUpdate: function (item, callback)
    {
      updateGantt(item, callback)
    },
    //start: '2014-01-10',
    //end: '2014-02-10',
    editable: true,
       template: function (item) 
       {
          return "<table> <tr><td>" + item.eStart + "</td> <td> "+ item.duration +  "</td> <td>" + item.eFinish+ "</td> " +
                "</tr> <tr> <td colspan='3'> " + item.description + "</td> </tr><tr> <td> " + item.lStart + "</td> <td> " + item.slack + " </td>"  +
                "<td> " + item.lFinish + " </td> </tr> <style> td{ border:solid; padding: 2px; } </style> </table>";
       }
  };

 function pertLayout(item)
{
    return '<h1>' + item.header + '</h1><p>' + item.description + '</p>';
    
   // return "<table> <tr><td> Early Start</td> <td> Duration </td> <td> Early Finish</td> " +
   //     "</tr> <tr> <td> Process name </td> </tr><tr> <td> Latest Start</td> <td> Slack </td>"  +
   //      "<td> Latest Finish </td> </tr> <style> td{ border:solid; } </style> </table>";
     
 }


  function updateGantt(item, callback)
  {
    redirect("moreItems");
    iName = __("itemName").value = item.content;
    iStart = __("itemStart").value = item.start;
    iEnd = __("itemEnd").value = item.end;

    editGantt(item, callback);
  }

  function addNewGantt(item, callback)
  {
    redirect("moreItems");
    editGantt(item, callback);
  }

function editGantt(item, callback)
{
  document.getElementById("done").onclick = function()
  {
    iName = __("itemName").value;
    iStart = __("itemStart").value ;
    iEnd = __("itemEnd").value;
    item.content = iName;
    item.start = iStart;
    item.end = iEnd;

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


  function redirect(id)
  {
    window.location = "#"+id;
  }

  function emptyInput()
  {
    __("itemName").value = "";
    __("itemStart").value = "";
    __("itemEnd").value = "";
  }

  var timeline = new vis.Timeline(container, items, options);