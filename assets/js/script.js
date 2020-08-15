const notifSound1 = "assets/sounds/notification-sound.mp3";
const notifSound2 = "assets/sounds/damn-son-whered-you-find-this.mp3";
// break reminder notification sound
const ding = new Audio(notifSound1);
ding.volume = .25;

// show the modal for the clicked tile
function showModal(id) {
    // id for selected activity's modal = (id + '_modal')
    document.getElementById(id + '_modal').style.display='grid';

    // display modal background tint
    document.querySelector('.modal').style.display='grid';
}

// show the modal for the activity selected
function showModalForActivity(elem) {
    let parentNode = elem.parentNode;
    let categories = parentNode.querySelectorAll('.category');
    let categoryLinks = parentNode.querySelectorAll('.category_link');
    
    // screen wipe categories
    for (i = 0;i < categories.length; i++) {
        categories[i].style.transform = 'translateX(-2em)';
        categories[i].style.opacity = '0';
    }
    setTimeout(function() {
        for (i = 0;i < categories.length; i++) {
            categories[i].style.display = 'none';
        }
        for (i = 0;i < categoryLinks.length; i++) {
            categoryLinks[i].style.display = 'grid';
        }
    }, 300);
    
    // show links for selected category of selected activity
    setTimeout(function() {
        for (i = 0;i < categoryLinks.length; i++) {
            categoryLinks[i].style.transform = 'translateX(0em)';
            categoryLinks[i].style.opacity = '1';
        }
    }, 300);
}

// allow closing of modal by clicking outside
window.onclick = function(ev) {
    if(ev.target == document.querySelector('.modal')) {
        // hide all modal_window elements
        let modal_windows = document.querySelectorAll('.modal')[0].children;
        for (i = 0; i < modal_windows.length; i++) {
            modal_windows[i].style.display = 'none';

            // reset all modal_windows' styling
            resetModalWindowDefaults(modal_windows[i]);
        }
        // hide modal background tint
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

// reset initial CSS conditions for modal_window elements
function resetModalWindowDefaults(elem) {
    let categories = elem.querySelectorAll('.category');
    let categoryLinks = elem.querySelectorAll('.category_link');

    // reset categories
    for (i = 0; i < categories.length; i++) {
        categories[i].style.transform = 'translateX(0em)';
        categories[i].style.opacity = '1';
        categories[i].style.display = 'block';
    }

    // reset links
    for (i = 0; i < categoryLinks.length; i++) {
        categoryLinks[i].style.transform = 'translateX(2em)';
        categoryLinks[i].style.opacity = '0';
        categoryLinks[i].style.display = 'none';
    }
}