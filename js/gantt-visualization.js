
function __(id)
{
  return document.getElementById(id);
}
 var items = new vis.DataSet([]);

 var container = document.getElementById('gantt-visualization');


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
    editable: true
  };


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
      console.log(item);
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
