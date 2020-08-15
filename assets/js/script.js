// values for exercises based on ability
document.getElementById('pushUpReps').innerHTML = 25;
document.getElementById('spidermanCrunchReps').innerHTML = 30;

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

// show the modal for the category selected
function showModalForCategory(elem) {
    // category is in the 1 index of the element's classList
    let category = elem.classList[1];
    let parentNode = elem.parentNode;
    let categories = parentNode.querySelectorAll('.category');
    let categoryLinks = parentNode.querySelectorAll('.category_link');
    
    // screen wipe categories
    for (let i = 0; i < categories.length; i++) {
        categories[i].style.transform = 'translateX(-2em)';
        categories[i].style.opacity = '0';
    }
    setTimeout(function() {
        for (let i = 0; i < categories.length; i++) {
            categories[i].style.display = 'none';
        }
    }, 300);
    
    // show modal for selected category of selected activity
    switch(category) {
        case 'geography':
        case 'science':
        case 'history':
            for (let i = 0; i < categoryLinks.length; i++) {
                // show modal that matches the clicked element's category 
                if (category === categoryLinks[i].classList[1]) {
                    for (let i = 0; i < categoryLinks.length; i++) {
                        categoryLinks[i].style.display = 'grid';
                    }
                }
            }
            setTimeout(function() {
                for (let i = 0; i < categoryLinks.length; i++) {
                    // show modal that matches the clicked element's category 
                    if (category === categoryLinks[i].classList[1]) {
                        categoryLinks[i].style.transform = 'translateX(0em)';
                        categoryLinks[i].style.opacity = '1';
                    }
                }
            }, 300);
            break;

        case 'calisthenics':
            let siblings = parentNode.children;
            let calisthenics = [];

            // change grid styling from parent
            parentNode.style.gridTemplateColumns = '1fr';

            for (let i = 0; i < parentNode.children.length; i++) {
                // make a list of calisthenic exercise elements
                if (siblings[i].classList[0] == "exercise"
                && siblings[i].classList[1] == "calisthenics") {
                    calisthenics.push(siblings[i]);
                }
            }
            // choose a random exercise to display
            let randomIdx = Math.floor(Math.random() * calisthenics.length);
            
            calisthenics[randomIdx].style.display = 'grid';
            setTimeout(function() {
                calisthenics[randomIdx].style.transform = 'translateX(0em)';
                calisthenics[randomIdx].style.opacity = '1';
            }, 300);
            break;

        default:
            console.log('The given category is not matched to any logic.');
            console.log('category encountered: ' + category);
    }
}

function closeModal() {
    // hide all modal_window elements
    let modal_windows = document.querySelectorAll('.modal')[0].children;
    for (let i = 0; i < modal_windows.length; i++) {
        modal_windows[i].style.display = 'none';
        modal_windows[i].style.gridTemplateColumns = 'repeat(3, 1fr)';

        // reset all modal_windows' styling
        resetModalWindowDefaults(modal_windows[i]);
    }
    // hide modal background tint
    document.querySelector('.modal').style.display = 'none';
}

// allow closing of modal by clicking outside
window.onclick = function(ev) {
    if(ev.target == document.querySelector('.modal')) {
        closeModal();
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
function resetModalWindowDefaults(modal_window) {
    let categories = modal_window.querySelectorAll('.category');
    let categoryLinks = modal_window.querySelectorAll('.category_link');
    let exercises = modal_window.querySelectorAll('.exercise');

    // reset categories
    for (let i = 0; i < categories.length; i++) {
        categories[i].style.transform = 'translateX(0em)';
        categories[i].style.opacity = '1';
        categories[i].style.display = 'grid';
    }
    
    // reset links
    for (let i = 0; i < categoryLinks.length; i++) {
        categoryLinks[i].style.transform = 'translateX(2em)';
        categoryLinks[i].style.opacity = '0';
        categoryLinks[i].style.display = 'none';
    }

    // reset exercises
    for (let i = 0; i < exercises.length; i++) {
        exercises[i].style.transform = 'translateX(2em)';
        exercises[i].style.opacity = '0';
        exercises[i].style.display = 'none';
    }
}