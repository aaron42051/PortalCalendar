function addRow(table, row, days, divs, last)
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
    for(j = 1; j < 8; j++)
    {
      temp[j] = " ";
    }
    //offset the top labels
    addRow(table, i + 4, temp, true, false);
  }
}

function addEvent(table, day, start, end, name) //swap to use Event
{
  // if (PM)
  // {
  //   start += 12;
  //   end += 12;
  // }
  for(start1 = start; start1 < end; start1++)
  {
    var inside = "<div class=\"cevent\"></div>";
    if(start1 ==start){
      inside = "<div class=\"cevent\">" + name + "</div>";
    }
    table.rows[start1].cells[day].innerHTML = inside;
  }
}

function getWeekEvents()
{
  for (key in events)
  {
    for (i = 0; i < events[key]; i++)
    {
      eventA = events[key];
      addEvent(table, eventA[i].start.getHours(),
      eventA[i].end.getHours(), eventA[i].title);
    }
  }
}

//Date

firstDay = currentDate.getDate() - day;
console.log(firstDay);
var weekNums = ["Time", 1, 2, 3, 4, 5, 6, 7];
for(i = 0; i < 7; i++)
{
  weekNums[i + 1] = firstDay + i;
}

var dayLabels=[time[0] + " AM", " ", " ", " ", " ", " ", " ", " "];



var table = document.querySelector(".week");


addTitle(table, month, year, "8", "week");

addRow(table, 1, weekNums, false, false); //row of day #'s'
newRow = table.insertRow(2);
for(i = 0; i < 8; i++)
{
  newRow.insertCell(i);
}
leftArrow = newRow.cells[0]; weekCol = newRow.cells[2];
dayCol = newRow.cells[5]; rightArrow = newRow.cells[7];
leftArrow.innerHTML = "<a href=\"\" class=\"link\"><</a>";
rightArrow.innerHTML = "<a href=\"\" class=\"link\">></a>";
weekCol.innerHTML = "<a href=\"calendar\" class=\"link\">Month</a>";
dayCol.innerHTML = "<a href=\"day\" class=\"link\">Day</a>";
addRow(table, 3, days, false, false);
fillWeek(table);
//table, day# - 1, start hour + 2, end hour + 2, name of event
