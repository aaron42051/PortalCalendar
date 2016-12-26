
//<------------------------------Event Class/Functions------------------->
var Event = function(title, start, end, repeat, weekdays, datetime, desc)
{
  this.title = title;
  this.start = start;
  this.end = end;
  this.repeat = repeat;
  this.weekdays = weekdays;
  this.datetime = datetime;
  this.desc = desc;
}


function applyEvent(table, e) //adds a green button to calendar view
{
  if(e.start.getMonth() === currentMonth)
  {
  for(i = 3; i < table.rows.length; i++)
  {
    var cell = 0;
    var firstDayOfWeek = table.rows[i].cells[cell].childNodes[0];
    while(firstDayOfWeek.innerHTML == "" || (i == 3 &&
    firstDayOfWeek.innerHTML > 7))
    {
      cell += 1;
      firstDayOfWeek = table.rows[i].cells[cell].childNodes[0];
    }
    firstDayOfWeek = parseInt(firstDayOfWeek.innerHTML);
    eventDay = e.start.getDate();
    if (eventDay >= firstDayOfWeek && eventDay<= firstDayOfWeek + 6)
    {
      var offset = eventDay - firstDayOfWeek + cell;
      var newDiv = document.createElement("div");
      newDiv.setAttribute("class", "cevent");
      //newDiv.addEventListener("click", openNav(e.datetime));
      newDiv.setAttribute("onclick", "openNav(" + "'" +  e.datetime + "'"+ ")");
      table.rows[i].cells[offset].childNodes[0].appendChild(newDiv);
      console.log(newDiv);
      drawer = document.querySelector("#leftDrawer");
      drawer.childNodes[1].setAttribute("onclick", "closeNav(" + "\"" +  e.datetime + "\""+ ")");
    }
  }
}
}

//after using addEvent modal
function submitEvent() //NEED TO CHECK FOR BAD INPUTS
{
  var title = document.querySelector("#EventTitle").elements[0].value;
  var startTime = document.querySelector("#Time").elements[1].value;
  var endTime = document.querySelector("#Time").elements[3].value;
  var startDate = document.querySelector("#Time").elements[0].value;
  var endDate = document.querySelector("#Time").elements[2].value;
  var repeat = document.getElementsByName("repeat");

  var desc = document.querySelector("#EventDesc").value;

  syear = parseInt(startDate.substring(0, 5));
  smonth = parseInt(startDate.substring(5, 8)) - 1;
  sday = parseInt(startDate.substring(8));

  var start = new Date(syear, smonth, sday);

  start.setHours(parseInt(startTime.substring(0, 2)));
  start.setMinutes(parseInt(startTime.substring(3, 5)));

  eyear = parseInt(endDate.substring(0, 5));
  emonth = parseInt(endDate.substring(6, 8));
  eday = parseInt(endDate.substring(8));
  var end = new Date(eyear, emonth, eday);

  end.setHours(parseInt(endTime.substring(0,2)));
  end.setMinutes(parseInt(endTime.substring(3,5)));
  console.log("start: " + start);

  console.log("title: " + title);

  console.log("end: " + endDate);
  console.log("desc: " + desc);
  for (radio = 0; radio < repeat.length; radio++)
  {
    if(repeat[radio].checked)
    {
      var repeatCheck = repeat[radio].value;
      break;
    }
  }
  console.log("repeat: " + repeatCheck);
  var weekdays = [];
  for (d = 0; d < days.length; d++)
  {
    if (days[d].checked)
    {
      weekdays[i] = days[d].value;
    }
  }
  xOut();
   var newEvent = new Event(title, start, end, repeatCheck, weekdays, startDate
   , desc);
  if(events[startDate] != null)
  {
    events[startDate].push(newEvent);
  }
  else
  {
    console.log("ADDED EVENT: " + startDate);
    events[startDate] = [newEvent];
    applyEvent(document.querySelector(".calendar"), newEvent);
  }
  postEvent(newEvent);
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

  for(i = 0; i < arr.length; i++)
  {
    e = arr[i];
    m1 = e.start.getMinutes();
    m2 = e.end.getMinutes();
    if (m1 < 10)
    {
      m1 = "0" + m1;
    }
    if (m2 < 10)
    {
      m2 = "0" + m2;
    }
    list.innerHTML += "<li>" + e.title + "<span id=\"time\">"
    + e.start.getHours() + ":" + m1 + " - " + e.end.getHours()
    + ":" +  m2 + "</span>" + "</li>";
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
  previousMonth = month - 1;
    while(d <= days_in_month[month])
    {
    weekNums = [];
    offset = 0;
    if(w == 3)
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
  count = 0;
  for(i = startDay - 1; i >= 0; i--)
  {
    currentDiv = table.rows[3].cells[count].childNodes[0];
    currentDiv.innerHTML = days_in_month[previousMonth] - i;
    currentDiv.setAttribute("class", "prevMonth");
    count += 1;
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
//var today = new Date();
var month = currentDate.getMonth();
var year = currentDate.getFullYear();
var day = currentDate.getDay();
var firstDay = new Date(year, month, 1);
var startDay = firstDay.getDay(); //which day of the first week
var currentMonth = month;
var currentYear = year;



//<------------------------------AJAX------------------------------------->
//likely want to move this to another file
var getURL = "http://localhost:3000/route";


var respond = function(data){
  if(httpRequest.readyState === XMLHttpRequest.DONE) //receive response
  {
    if(httpRequest.status === 200)//successful call
    {
      //alert(httpRequest.responseText);
      console.log("200 OK");
      parse = JSON.parse(data["currentTarget"]["response"]);
      for (i = 0; i < parse.length; i++)
      {
        currentEvent = parse[i];
        datestring = currentEvent["datetime"];
        console.log(datestring);
        currentEvent.start = new Date(currentEvent.start);
        currentEvent.end = new Date(currentEvent.end);
        if (events[datestring] != null) //fuse into another function later
        {
          events[datestring].push(parse[i]);
        }
        else
        {
          events[datestring] = [currentEvent];
          console.log("start: " + parse[0]);
          applyEvent(document.querySelector(".calendar"), currentEvent);
          console.log("ADDED EVENT");
        }

      }
    }
    else
    {
      console.log("Problem with request");
    }
  }
  else
  {

  }
}

var post = function(data) {
  if(httpRequest.readyState === XMLHttpRequest.DONE) //receive response
  {
    if(httpRequest.status === 200)//successful call
    {
      //alert(httpRequest.responseText);
      console.log("200 OK");

    }
    else
    {
      console.log("Problem with request");
    }
  }
  else
  {
    console.log("status: " + httpRequest.readyState);
  }
}

if (window.XMLHttpRequest) { // Mozilla, Safari, IE7+ ...
    httpRequest = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE 6 and older
    httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
}

function postEvent(e)
{

  httpRequest.onreadystatechange = post;
  //httpRequest.open("POST", getURL);
  console.log("event start date: " + e.start);
  data1 = JSON.stringify(e);
  console.log(data1);
  $.ajax({
    type:"POST",
    url:getURL,
    data: data1,
    contentType: "application/json",
    dataType: "json",
    success: post
  });
}

function getEvents()
{
  httpRequest.onreadystatechange = respond;
  httpRequest.open("GET", getURL);
  httpRequest.send();
}

function getPage(url)
{

}
//<------------------------------MISC------------------------------------->

function makeDatestring(datetime)
{
  year = datetime.getFullYear();
  year += "-";
  month = datetime.getMonth() + "-";
  day = datetime.getDay();
  if(datetime.getMonth() < 10)
  {
    month = "0" + datetime.getMonth() + "-";
  }
  if(datetime.getDay() < 10)
  {
    day = "0" + datetime.getDay();
  }
  datestring = year + month + day;
  return datestring;
}
