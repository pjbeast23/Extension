const v1 = document.getElementsByClassName('clock')[0];
const v2 = v1.getElementsByClassName('min')[0];
const v3 = v1.getElementsByClassName('sec')[0];

// Function to update the timer display
function updateTimerDisplay(minutes, seconds) {
    v2.innerHTML = minutes.toString().padStart(2, '0');
    v3.innerHTML = seconds.toString().padStart(2, '0');
}

// Function to update the timer minutes in storage
function updateTimerMinutesInStorage(minutes) {
    chrome.storage.sync.set({ minutes: minutes }, () => {
        console.log(`Timer minutes updated in storage: ${minutes}`);
    });
}

// Function to update the timer seconds in storage
function updateTimerSecondsInStorage(seconds) {
    chrome.storage.sync.set({ seconds: seconds }, () => {
        console.log(`Timer seconds updated in storage: ${seconds}`);
    });
}

// Function to retrieve timer seconds from storage and update display
function retrieveTimerSecondsFromStorage() {
    chrome.storage.sync.get(['seconds'], (result) => {
        const { seconds = 0 } = result;
        updateTimerDisplay(parseInt(v2.innerHTML), seconds); // Update display with stored seconds
    });
}

// Function to retrieve timer minutes from storage and update display
function retrieveTimerMinutesFromStorage() {
    chrome.storage.sync.get(['minutes'], (result) => {
        const { minutes = 20 } = result;
        updateTimerDisplay(minutes, 0); // Update display with stored minutes
    });
}

// Function to update the timer display and storage every second
function startval() {
    let val = parseInt(v2.innerHTML);
    let val1 = parseInt(v3.innerHTML);

    val1--;
    if (val1 === -1) {
        val--;
        val1 = 59;
    }

    updateTimerDisplay(val, val1);
    updateTimerMinutesInStorage(val);
    updateTimerSecondsInStorage(val1);

    if (val === 19 && val1 === 50) {
        window.location.href = "newpage.html";
    }

    v3.innerHTML = val1.toString().padStart(2, '0');
    v2.innerHTML = val.toString().padStart(2, '0');
}

// Function to reset the timer
function reset() {
    v2.innerHTML = '20';
    v3.innerHTML = '00';
    updateTimerMinutesInStorage(20);
    updateTimerSecondsInStorage(0);
}

// Function to start the timer interval
function start() {
    console.log("hello");
    setInterval(startval, 1000);
}

// Event listeners for buttons
document.getElementById('start').addEventListener('click', start);
document.getElementById('reset').addEventListener('click', reset);

// Retrieve initial timer values from storage
retrieveTimerMinutesFromStorage();
retrieveTimerSecondsFromStorage();
