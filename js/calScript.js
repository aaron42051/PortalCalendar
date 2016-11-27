var modal = document.querySelector("#AddModal");
var plusButton = document.querySelector("#AddEventBtn");
var span = document.querySelector(".close");
var noneButton = document.getElementsByName("repeat")[0];
var weekButton = document.getElementsByName("repeat")[1];
var monthButton = document.getElementsByName("repeat")[2];
var firstDay = new Date(year, month, 1);
var startDay = firstDay.getDay(); //which day of the first week

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

var monthLength = days_in_month[month]; //# of days in month

var table = document.querySelector(".calendar");

addTitle(table, month, year, "7", "month");

addWeek(table, 1, ["S", "M", "T", "W", "TH", "F", "S"], false, false);
var currentDay = 1; //keep track of day labels, start day 1
var currentWeek = 2; //after header and labels, start week 0
var lastWeek = false; //don't fill in days past 29-31

//filling in the days
fillDays(table, currentDay, currentWeek, lastWeek, month);

//add to drop down
// var drop = document.querySelector("#days");
// for(var g = 1; g <= monthLength; g++)
// {
//   var num = document.createElement("option");
//   num.setAttribute("value", g);
//   num.innerHTML = g;
//   drop.appendChild(num);
// }


//events.push(new Event("School", "00:21", "12:21", "None", [], "1", month));
//applyEvent(table, events[0]);

function openNav(datestring) {
  listDay(datestring);
  document.getElementById("leftDrawer").style.width = "20%";
}

function closeNav() {
  document.getElementById("leftDrawer").style.width = 0;
}
