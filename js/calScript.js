
//modal
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

function Event(title, start, end, repeat, weekdays, day)
{
  this.title = title;
  this.start = start;
  this.end = end;
  this.repeat = repeat;
  this.weekdays = weekdays;
  this.day = day;
}
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
    console.log(firstDayOfWeek);

    if (e.day >= firstDayOfWeek && e.day<= firstDayOfWeek + 6)
    {
      console.log("week: " + (i-2));
      var offset = e.day - firstDayOfWeek + cell;
      console.log("offset: " + offset);
      var newDiv = document.createElement("div");
      newDiv.setAttribute("class", "cevent");
      table.rows[i].cells[offset].childNodes[0].appendChild(newDiv);
    }
  }
}

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

var events = [];

//useful date variables
var days_in_month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//Date
var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();




//Calendar Header

var firstDay = new Date(year, month, 1);
var startDay = firstDay.getDay(); //which day of the first week

var monthLength = days_in_month[month]; //# of days in month

//header
var table = document.querySelector(".calendar");
//probably a function, for later
//    |
//    |
//    v
var firstRow = table.insertRow(0);
var th = document.createElement('th');
th.innerHTML = months[month] + " " + year;
th.colSpan = "7";
th.setAttribute("id", "month");
firstRow.appendChild(th);


addWeek(table, 1, ["S", "M", "T", "W", "TH", "F", "S"], false, false);
var currentDay = 1; //keep track of day labels
var currentWeek = 2; //after header and labels
var lastWeek = false; //don't fill in days past 29-31

//Probably will become a function
while(currentDay <= days_in_month[month])
{
  var weekNums = [];
  var offset = 0;
  if(currentWeek == 2)
  {
    offset = startDay;
  }
  for (i = 0; i < 7 - offset; i++)
  {
    if(currentDay <= days_in_month[month])
    {
      weekNums.push(currentDay);
      currentDay+= 1;
    }
    else
    {
        lastWeek = true;
    }
  }
  addWeek(table, currentWeek, weekNums, true, lastWeek);
  currentWeek+=1;
}

//add to drop down
var drop = document.querySelector("#days");
for(var g = 1; g <= monthLength; g++)
{
  var num = document.createElement("option");
  num.setAttribute("value", g);
  num.innerHTML = g;
  drop.appendChild(num);
}
console.log(events);
events.push(new Event("School", "00:21", "12:21", "None", [], "1"));
applyEvent(table, events[0]);
