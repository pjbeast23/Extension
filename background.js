let timerInterval;

// Function to handle the timer tick
function timerTick() {
    chrome.storage.sync.get(['minutes', 'seconds'], (result) => {
        let { minutes = 20, seconds = 0 } = result;

        seconds--;
        if (seconds === -1) {
            minutes--;
            seconds = 59;
        }

        // Update storage with updated values
        chrome.storage.sync.set({ minutes, seconds });

        // Check if timer reaches 19:50
        if (minutes === 19 && seconds === 50) {
            stopTimer(); // Stop the timer when condition is met
            chrome.tabs.create({ url: 'newpage.html' });
        }
    });
}

// Function to start the timer using chrome.alarms
function startTimer() {
    timerInterval = setInterval(timerTick, 1000); // Run timerTick every second
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Handle alarm events (timer ticks)
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'timerAlarm') {
        timerTick();
    }
});

// Listen for messages from popup or other scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'startTimer') {
        startTimer();
    } else if (message.action === 'stopTimer') {
        stopTimer();
    }
});

// Ensure timer is stopped when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    clearInterval(timerInterval);
});
