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

var monthLength = days_in_month[month]; //# of days in month

var table = document.querySelector(".calendar");

addTitle(table, month, year, "7", "month");

addWeek(table, 1, ["S", "M", "T", "W", "TH", "F", "S"], false, false);
var currentDay = 1; //keep track of day labels, start day 1
var currentWeek = 2; //after header and labels, start week 0
var lastWeek = false; //don't fill in days past 29-31

//filling in the days
fillDays(table, currentDay, currentWeek, lastWeek, month);


function openNav(datestring) {
  listDay(datestring);
  document.getElementById("leftDrawer").style.width = "20%";
}

function closeNav(datestring) {
  removeList(datestring);
  document.getElementById("leftDrawer").style.width = 0;
}
getEvents();
//postEvent(new Event("School", "11:21", "23:11", false, [], "2016-11-11"));