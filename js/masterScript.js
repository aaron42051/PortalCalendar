var ajaxURL = "http://thiman.me:1337/aaron";


//<------------------------------Event Class/Functions------------------->
var Event = function(title, start, end, repeat, weekdays, datetime)
{
  this.title = title;
  this.start = start;
  this.end = end;
  this.repeat = repeat;
  this.weekdays = weekdays;
  this.datetime = datetime;
}



function applyEvent(table, e) //adds a green button to calendar view
{
  day = e.datetime.getDate();
  month = e.datetime.getMonth();
  year = e.datetime.getFullYear();
  if(day < 10)
  {
    day = "0" + day;
  }
  if(month < 10)
  {
    month = "0" + month;
  }
  for(var i = 2; i < table.rows.length; i++)
  {
    var cell = 0;
    var firstDayOfWeek = table.rows[i].cells[cell].childNodes[0].innerHTML;
    while(firstDayOfWeek == "")
    {
      cell += 1;
      firstDayOfWeek = table.rows[i].cells[cell].childNodes[0].innerHTML;
    }
    firstDayOfWeek = parseInt(firstDayOfWeek);

    if (day >= firstDayOfWeek && day<= firstDayOfWeek + 6)
    {
      datestring = year + "-" + month + "-" + day;
      var offset = day - firstDayOfWeek + cell;
      var newDiv = document.createElement("div");
      newDiv.setAttribute("class", "cevent");
      newDiv.setAttribute("onclick", "openNav(" + "\"" +  datestring + "\""+ ")");
      table.rows[i].cells[offset].childNodes[0].appendChild(newDiv);
      drawer = document.querySelector("#leftDrawer");
      drawer.childNodes[1].setAttribute("onclick", "closeNav(" + "\"" +  datestring + "\""+ ")");
    }
  }
}

//after using addEvent modal
function submitEvent() //NEED TO CHECK FOR BAD INPUTS
{
  var title = document.querySelector("#EventTitle").elements[0].value;
  var start = document.querySelector("#Time").elements[0].value;
  var end = document.querySelector("#Time").elements[1].value;
  var repeat = document.getElementsByName("repeat");
  //var day = document.querySelector("#days").value;
  var date = document.querySelector("#date").elements[0].value;
  console.log(date);
  for (radio = 0; radio < repeat.length; radio++)
  {
    if(repeat[radio].checked)
    {
      var repeatCheck = repeat[radio].value;
      break;
    }
  }
  var weekdays = [];
  for (d = 0; d < days.length; d++)
  {
    if (days[d].checked)
    {
      weekdays[i] = days[d].value;
    }
  }
  xOut();
  y = parseInt(date.substring(0, 4));
  m = parseInt(date.substring(5, 7));
  d = parseInt(date.substring(8));
  var newEvent = new Event(title, start, end, repeatCheck, weekdays, new Date(y, m, d));
  if(events[date] != null)
  {
    events[date].push(newEvent);
  }
  else
  {
    console.log("ADDED EVENT: " + date);
    events[date] = [newEvent];
    applyEvent(document.querySelector(".calendar"), newEvent);
  }

}

function displayEvents(table)
{
  displayed = [];
  for(key in events)
  {
    if (parseInt(key.substring(5, 7)) == currentMonth && displayed.indexOf(key) == -1)
    {
      applyEvent(table, events[key]);
      displayed.push(key);
    }
  }
}

function listDay(datestring)
{
  y = datestring.substring(0, 4);
  m = datestring.substring(5, 7);
  d = datestring.substring(8);
  drawer = document.querySelector("#leftDrawer");
  drawerDate = document.querySelector("#drawerDate");
  drawerDate.innerHTML = m + "/" + d + "/" + y;
  list = document.createElement("ol");
  list.setAttribute("class", "list");
  arr = events[datestring];
  console.log(datestring);
  console.log("event during listDay: " + arr);
  for(i = 0; i < events[datestring].length; i++)
  {
    e = arr[i];
    list.innerHTML += "<li>" + e.title + "</li>";
  }
  drawer.appendChild(list);
}

function removeList(datestring)
{
  drawer = document.querySelector("#leftDrawer");
  drawerDate = document.querySelector("#drawerDate");
  drawerDate.innerHTML = "";
  drawer.removeChild(drawer.childNodes[5]);
}

//<------------------------------HTML Table Editing----------------------->
function addWeek(table, row, days, divs, last)
{
  var newR = table.insertRow(row);
  for(i = 0; i < 7; i++)
  {
    var newC = newR.insertCell(i);
    var startPoint = 7 - days.length;
    var endPoint = 7;
    if(last)
    {
      startPoint = 0;
      endPoint = 7 - days.length;
    }
    if(divs)
    {
      var div = document.createElement("div");
      if(i >= startPoint && i <= endPoint)
      {
        div.innerHTML = days[i-startPoint];
      }
      newC.appendChild(div);
    }
    else
    {
      if(i >= startPoint)
      {
        newC.innerHTML = days[i-startPoint];
      }
    }
  }
}
function addTitle(table, month, year, cSpan, id)
{
  firstRow = table.insertRow(0);
  th = document.createElement('th');
  th.innerHTML = months[month] + " " + year;
  th.colSpan = cSpan;
  th.setAttribute("id", id);
  firstRow.appendChild(th);
}

function fillDays(table, currentDay, currentWeek, lastWeek, month)
{
  d = currentDay;
  w = currentWeek;
    while(d <= days_in_month[month])
    {
    weekNums = [];
    offset = 0;
    if(w == 2)
    {
      offset = startDay;
    }
    for (i = 0; i < 7 - offset; i++)
    {
      if(d <= days_in_month[month])
      {
        weekNums.push(d);
        d+= 1;
      }
      else
      {
          lastWeek = true;
      }
    }
    addWeek(table, w, weekNums, true, lastWeek);
    w+=1;
  }
}

function addRow(table, row, days, divs, day)
{
  var newR = table.insertRow(row);
  for(k = 0; k < 2; k++)
  {
    var newC = newR.insertCell(k);
    var startPoint = 2 - days.length;
    var endPoint = 2;
    if(divs)
    {
      var div = document.createElement("div");
      if(k >= startPoint && k <= endPoint)
      {
        div.innerHTML = days[k-startPoint];
        if(day && k != 0)
        {
          div.setAttribute("class", "hour");
        }
      }
      newC.appendChild(div);
    }
    else
    {
      if(k >= startPoint)
      {
        newC.innerHTML = days[k-startPoint];
      }
    }
  }
}
//<------------------------------Global Variables------------------------->

var events = {};

//useful date variables
var days_in_month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var time = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

//Date
var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();
var day = today.getDay();
var currentMonth = month;
var currentYear = year;



//<------------------------------AJAX------------------------------------->
//likely want to move this to another file
var respond = function(){
  if(httpRequest.readyState === XMLHttpRequest.DONE) //receive response
  {
    if(httpRequest.status === 200)//successful call
    {
      alert(httpRequest.responseText);
    }
    else
    {
      alert("Problem with request");
    }
  }
  else
  {

  }
}

if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

function postEvent(e)
{

  httpRequest.onreadystatechange = respond;

  data1 = JSON.stringify(e);
  $.ajax({
    type:"POST",
    url:ajaxURL,
    data: data1,
    contentType: "application/json",
    dataType: "json",
    success: respond
  });
}
