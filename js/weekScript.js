function addWeek(table, row, days, divs, last)
{
  var newR = table.insertRow(row);
  for(k = 0; k < 8; k++)
  {
    var newC = newR.insertCell(k);
    var startPoint = 8 - days.length;
    var endPoint = 8;
    if(last)
    {
      startPoint = 0;
      endPoint = 8 - days.length;
    }
    if(divs)
    {
      var div = document.createElement("div");
      if(k >= startPoint && k <= endPoint)
      {
        div.innerHTML = days[k-startPoint];
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

function addEvent(table, day, start, end, name, PM)
{
  if (PM)
  {
    start += 12;
    end += 12;
  }
  for(start1 = start; start1 < end; start1++)
  {
    var inside = "<div class=\"cevent\"></div>";
    if(start1 ==start){
      inside = "<div class=\"cevent\">" + name + "</div>";
    }
    table.rows[start1].cells[day].innerHTML = inside;
  }
}

//useful date variables
var days_in_month = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var time = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
//Date
var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();

var weekNums = ["Time", 1, 2, 3, 4, 5, 6, 7]; //test array
var labels =[];

var dayLabels=[time[0] + " AM", " ", " ", " ", " ", " ", " ", " "];



var table = document.querySelector(".week");

var firstRow = table.insertRow(0);
var th = document.createElement('th');
th.innerHTML = months[month] + " " + year;
th.colSpan = "8";
th.setAttribute("id", "month");
firstRow.appendChild(th);

addWeek(table, 1, weekNums, false, false); //row of day #'s'
for (i = 0; i < 24; i++)
{
  var temp = [];
  temp[0] = time[i % 12];
  if(i > 11)
  {
    temp[0] += " PM";
  }
  else
  {
    temp[0] += " AM";
  }
  for(j = 1; j < 8; j++)
  {
    temp[j] = " ";
  }
  //labels[i] = temp;
  addWeek(table, i + 2, temp, true, false);
}

//table, day# - 1, start hour + 2, end hour + 2, name of event
addEvent(table, 3, 4, 7, "School", true);
