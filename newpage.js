const v1 = document.getElementsByClassName('clock')[0];
const v2 = document.getElementsByClassName('min')[0];
const v3 = document.getElementsByClassName('sec')[0];
function returnToTimer() {
    window.location.href = "popup.html";
    // Reset values as needed
    v2.innerHTML = '20';
    v3.innerHTML = '00';
}
document.getElementById('returnToTimer').addEventListener('click',returnToTimer);