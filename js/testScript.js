
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
var firstRow = table.insertRow(0);
var th = document.createElement('th');
th.innerHTML = months[month] + " " + year;
th.colSpan = "7";
th.setAttribute("id", "month");
firstRow.appendChild(th);


addWeek(table, 1, ["S", "M", "T", "W", "TH", "F", "S"], false);
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
