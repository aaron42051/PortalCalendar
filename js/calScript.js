//Calendar Header

var firstDay = new Date(year, month, 1);
var startDay = firstDay.getDay(); //which day of the first week

var monthLength = days_in_month[month]; //# of days in month

var table = document.querySelector(".calendar");

addTitle(month, year, "7", "month");

addWeek(table, 1, ["S", "M", "T", "W", "TH", "F", "S"], false, false);
var currentDay = 1; //keep track of day labels, start day 1
var currentWeek = 2; //after header and labels, start week 0
var lastWeek = false; //don't fill in days past 29-31

//filling in the days
fillDays(table, currentDay, currentWeek, lastWeek, month);

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
