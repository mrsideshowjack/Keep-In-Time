
var container = document.getElementById('pert-visualization');

var items = new vis.DataSet([]);

/*var items = new vis.DataSet([
{id: 0, group: 0, description: 'some bull shit', start: new Date(2014, 3, 17), eStart: '2014/3/17', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/17',  lFinish: '2014/4/20', slack: '10 Days'},
{id: 1, group: 0, description: 'some bull shit', start: new Date(2014, 3, 19), eStart: '2014/3/19', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/19',  lFinish: '2014/4/20', slack: '10 Days'},
{id: 2, group: 1, description: 'some bull shit', start: new Date(2014, 3, 16), eStart: '2014/3/16', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/16',  lFinish: '2014/4/20', slack: '10 Days'},
{id: 3, group: 1, description: 'some bull shit', start: new Date(2014, 3, 23), eStart: '2014/3/23', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/23',  lFinish: '2014/4/20', slack: '10 Days'},
{id: 4, group: 1, description: 'some bull shit', start: new Date(2014, 3, 22), eStart: '2014/3/22', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/22',  lFinish: '2014/4/20', slack: '10 Days'},
{id: 5, group: 2, description: 'some bull shit', start: new Date(2014, 3, 24), eStart: '2014/3/24', eFinish: '2014/4/20', duration: '14 Days', lStart: '2014/3/24',  lFinish: '2014/4/20', slack: '10 Days'}
]);*/

/*var items2 = new vis.DataSet([
  {id: 0, group: 0, content: 'item 0', start: new Date(2014, 3, 17)},
  {id: 1, group: 0, content: 'item 1', start: new Date(2014, 3, 19)},
  {id: 2, group: 1, content: 'item 2', start: new Date(2014, 3, 16)},
  {id: 3, group: 1, content: 'item 3', start: new Date(2014, 3, 23)},
  {id: 4, group: 1, content: 'item 4', start: new Date(2014, 3, 22)},
  {id: 5, group: 2, content: 'item 5', start: new Date(2014, 3, 24)}
]);*/



var iName; var iStart; var iEnd; var lStart; var lEnd;

var options =
{
  onAdd: function(item, callback)
  {
    addNewPert(item, callback)
  },
  onUpdate: function (item, callback)
  {
    updatePert(item, callback)
  },
  editable: true,
  template: function (item)
  {
    return templateTable(item);
  }
};

function pertLayout(item)
{
  return '<h1>' + item.header + '</h1><p>' + item.description + '</p>';

  // return "<table> <tr><td> Early Start</td> <td> Duration </td> <td> Early Finish</td> " +
  //     "</tr> <tr> <td> Process name </td> </tr><tr> <td> Latest Start</td> <td> Slack </td>"  +
  //      "<td> Latest Finish </td> </tr> <style> td{ border:solid; } </style> </table>";

}

function templateTable(item)
{
  return "<table> <tr><td>" + item.eStart + "</td> <td> "+ item.duration +  "</td> <td>" + item.eFinish+ "</td> " +
  "</tr> <tr> <td colspan='3'> " + item.description + "</td> </tr><tr> <td> " + item.lStart + "</td> <td> " + item.slack + " </td>"  +
  "<td> " + item.lFinish + " </td> </tr> <style> td{ border:solid; } </style> </table>";
}



function updatePert(item, callback)
{
  redirect("moreItems");
  iName = __("itemName").value = item.description;
  iStart = __("itemStart").value = item.estart;
  iEnd = __("itemEnd").value = item.eFinish;
  lStart = __("itemlStart").value = item.lStart;
  End = __("itemlEnd").value = item.lFinish;
  editPert(item, callback);
}


function addNewPert(item, callback)
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
    item.slack = daysOn(lStart,lEnd);//Slack
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



var timeline = new vis.Timeline(container, items, options);
