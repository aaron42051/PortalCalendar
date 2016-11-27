

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



var weekNums = ["Time", 1, 2, 3, 4, 5, 6, 7]; //test array

var dayLabels=[time[0] + " AM", " ", " ", " ", " ", " ", " ", " "];



var table = document.querySelector(".day");


addTitle(month, year, "2", "month");

addRow(table, 1, [days[day]], false, false);
table.rows[1].cells[1].setAttribute("colSpan", "2");
fillWeek(table);
