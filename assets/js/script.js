const notifSound1 = "assets/sounds/notification-sound.mp3";
const notifSound2 = "assets/sounds/damn-son-whered-you-find-this.mp3";
// break reminder notification sound
const ding = new Audio(notifSound2);
ding.volume = .25;

// show the modal for the clicked tile
function showModal(id) {
    // display only the modal_window clicked
    modalId = id + '_modal';
    document.getElementById(modalId).style.display='grid';

    // display modal background
    document.querySelector('.modal').style.display='grid';
}

// allow closing of modal by clicking outside
window.onclick = function(ev) {
    if(ev.target == document.querySelector('.modal')) {
        // hide all modal_window elements
        const modal_windows = document.querySelectorAll('.modal')[0].children;
        for (i = 0; i < modal_windows.length; i++) {
            modal_windows[i].style.display = 'none';
        }
        
        // hide modal background
        document.querySelector('.modal').style.display = 'none';
    }
}

// stopwatch
let seconds = 0;
let minutes = 0;
let hours = 0;
tick();
function timeOnSite() {
    setTimeout(tick, 1000);
}
function tick() {
    seconds++;
    
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes % 30 == 0) ding.play();

        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    document.getElementById('clock').textContent = 
    (hours > 0 ?
        (hours <= 9) ?
            "0" + hours
            : hours
        : "00")

    + ":" +
    
    (minutes > 0 ?
        (minutes <= 9) ?
            "0" + minutes
            : minutes
        : "00")
    
    + ":" +
    
    (seconds > 0 ?
        (seconds <= 9) ?
            "0" + seconds
            : seconds
        : "00");
    timeOnSite();
}

// redirect to media of type chosen by user
function goToMediaFromCategory(id) {
    console.log(id);
}