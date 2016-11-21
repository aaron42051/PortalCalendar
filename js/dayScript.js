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

function fillWeek(table)
{
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
    temp[1] = " ";
    //offset the top labels
    addRow(table, i + 2, temp, true, true);
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
var day = today.getDay();

var weekNums = ["Time", 1, 2, 3, 4, 5, 6, 7]; //test array

var dayLabels=[time[0] + " AM", " ", " ", " ", " ", " ", " ", " "];



var table = document.querySelector(".day");

var firstRow = table.insertRow(0);
var th = document.createElement('th');
//add title
th.innerHTML = months[month] + " " + year;
th.colSpan = "2";
th.setAttribute("id", "month");
firstRow.appendChild(th);

addRow(table, 1, [days[day]], false, false);
table.rows[1].cells[1].setAttribute("colSpan", "1");
fillWeek(table);
