var ajaxURL = "http://thiman.me:1337/aaron";



//<------------------------------Calendar Modal--------------------------->
var modal = document.querySelector("#AddModal");
var plusButton = document.querySelector("#AddEventBtn");
var span = document.querySelector(".close");
var noneButton = document.getElementsByName("repeat")[0];
var weekButton = document.getElementsByName("repeat")[1];
var monthButton = document.getElementsByName("repeat")[2];

function buttonClick() {
    modal.style.display = "block";
}
function xOut() {
    modal.style.display = "none";
}

plusButton.addEventListener("click", buttonClick);
span.addEventListener("click", xOut);
weekButton.addEventListener("click", checkRadio);
monthButton.addEventListener("click", checkRadio);
noneButton.addEventListener("click", checkRadio);

function checkRadio() //gray out checkboxes if repeat == "None"
{

  var repeat = document.getElementsByName("repeat")[0];
  var dat = document.getElementsByName("dayOfWeek");
  if (repeat.checked == false)
  {
    for (var i = 0; i < dat.length; i++)
    {
      dat[i].disabled = false;
    }
  }
  else {
      for (var i = 0; i < dat.length; i++)
      {
        dat[i].disabled = true;
      }
    }
}

//<------------------------------Event Class/Functions------------------->
var Event = function(title, start, end, repeat, weekdays, day)
{
  this.title = title;
  this.start = start;
  this.end = end;
  this.repeat = repeat;
  this.weekdays = weekdays;
  this.day = day;
}

function applyEvent(table, e)
{
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

    if (e.day >= firstDayOfWeek && e.day<= firstDayOfWeek + 6)
    {
      var offset = e.day - firstDayOfWeek + cell;
      var newDiv = document.createElement("div");
      newDiv.setAttribute("class", "cevent");
      table.rows[i].cells[offset].childNodes[0].appendChild(newDiv);
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
  var day = document.querySelector("#days").value;
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
  var newEvent = new Event(title, start, end, repeatCheck, weekdays, day);
  events.push(newEvent);
  applyEvent(document.querySelector(".calendar"), newEvent);
}


//<------------------------------HTML Editing--------------------------->
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
function addTitle(month, year, cSpan, id)
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


//<------------------------------Global Variables------------------------->

var events = [];

//useful date variables
var days_in_month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//Date
var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();


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
