
//modal
var modal = document.querySelector("#AddModal");

var plusButton = document.querySelector("#AddEventBtn");

var span = document.querySelector(".close");

function buttonClick() {
    modal.style.display = "block";
}
function xOut() {
    modal.style.display = "none";
}
console.log(plusButton);

plusButton.addEventListener("click", buttonClick);

span.addEventListener("click", xOut);



// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
