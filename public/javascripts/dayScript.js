

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


addTitle(table, month, year, "2", "day");

row2 = table.insertRow(1); //temp
th = document.createElement('th');
th.innerHTML= days[day];
th.colSpan = "2";
row2.appendChild(th);


fillWeek(table);
