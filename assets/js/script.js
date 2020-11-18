const fadeTime = 300;

// values for exercises based on ability
document.getElementById('pushUpReps').innerHTML = 10;
document.getElementById('spidermanCrunchReps').innerHTML = 10;
document.getElementById('squatReps').innerHTML = 15;
document.getElementById('russianTwistReps').innerHTML = 10;

document.getElementById('walkDist').innerHTML = .25;

document.getElementById('curlReps').innerHTML = 15;

document.getElementById('boatPoseHold').innerHTML = 10;

const notifSound1 = "/sounds/notification-sound.mp3";
const notifSound2 = "/sounds/damn-son-whered-you-find-this.mp3";
// break reminder notification sound
const ding = new Audio(notifSound1);
ding.volume = .25;

// show the modal for the clicked tile
function showModal(id) {
    // id for selected activity's modal = (id + '_modal')
    document.getElementById(id + '_modal').style.display='grid';
    
    if (id == 'to_do') {
        document.getElementById(id + '_modal').style.gridTemplateColumns='repeat(2, 1fr)';
    }

    // display modal background tint
    document.getElementById('modal').style.display='grid';
}

// show the modal for the category selected, handle subsequent selection events
function showModalForCategory(elem) {
    // category is in the 1 index of the element's classList
    let category = elem.classList[1];
    let parent = elem.parentNode;

    let siblings = parent.children;
    let categories = parent.querySelectorAll('.category');
    
    // screen wipe categories out
    for (let i = 0; i < categories.length; i++) {
        categories[i].style.transform = 'translateX(-2em)';
        categories[i].style.opacity = '0';
    }
    setTimeout(function() {
        for (let i = 0; i < categories.length; i++) {
            categories[i].style.display = 'none';
        }
    }, fadeTime);
    
    // show modal for selected category of selected activity
    switch(category) {
        case 'geography':
        case 'history':
        case 'language':
        case 'music':
        case 'science':
            showCategoryLinks(category, parent);
            break;

        case 'calisthenics':
        case 'cardio':
        case 'weight':
        case 'yoga':
            showRandomExercise(category, siblings, parent);
            break;

        case 'sudoku':
            showCategoryLinks(category, parent);
            break;
        default:
            closeModal();
            console.log('The given category is not matched to any logic.');
            console.log('Category encountered: ' + category);
    }
}

function closeModal() { 
    let modal_windows = document.getElementById('modal').children;
    
    for (let i = 0; i < modal_windows.length; i++) {
        // hide all modal_window elements
        modal_windows[i].style.display = 'none';
        modal_windows[i].style.gridTemplateColumns = 'repeat(3, 1fr)';

        // reset all modal_windows' styling
        resetModalWindowDefaults(modal_windows[i]);
    }
    // hide modal background tint
    document.getElementById('modal').style.display = 'none';
}

// allow closing of modal by clicking outside of it
window.onclick = function(ev) {
    if(ev.target == document.getElementById('modal')) {
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
        categories[i].style.display = 'inline';
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

// show links for the selected category
function showCategoryLinks(category, parent) {
    let categoryLinks = parent.querySelectorAll('.category_link');

    setTimeout(function() {
        for (let i = 0; i < categoryLinks.length; i++) {
            // show modal that matches the clicked element's category 
            if (category === categoryLinks[i].classList[1]) {
                categoryLinks[i].style.display = 'flex';
            }
        }
        for (let i = 0; i < categoryLinks.length; i++) {
            // show modal that matches the clicked element's category 
            if (category === categoryLinks[i].classList[1]) {
                categoryLinks[i].style.transform = 'translateX(0em)';
                categoryLinks[i].style.opacity = '1';
            }
        }
    }, fadeTime);
}

// show a random exercise from the selected category
function showRandomExercise(category, siblings, parent) {
    let exercises = [];
    for (let i = 0; i < siblings.length; i++) {
        // make a list of exercise elements for the category given
        if (siblings[i].classList[0] == "exercise"
        && siblings[i].classList[1] == category) {
            exercises.push(siblings[i]);
        }
    }
    // choose a random exercise to display
    let randomIdx = Math.floor(Math.random() * exercises.length);
    setTimeout(function() {
        exercises[randomIdx].style.display = 'grid';
        exercises[randomIdx].style.transform = 'translateX(0em)';
        exercises[randomIdx].style.opacity = '1';

        // change grid styling for parent
        parent.style.gridTemplateColumns = '1fr';
    }, fadeTime);
}

// update completed activity list
function updateCompletedList(elem) {
    let grandParent = elem.parentNode.parentNode;
    let updateAmount = grandParent.querySelector('.target_reps').innerHTML;
    
    switch(grandParent.classList[0]) {
        case 'exercise':
            let updateSpan = document.getElementById('get_up_completed');
            // grandParent.classList[1];
            updateSpan.textContent = +updateSpan.innerHTML + +updateAmount;
            break;
        default:
            console.log('Class not recognized, `completed` list not updated.');
    }

    closeModal();
}

function addTaskToList(elem) {
    let parent = elem.parentNode;
    let inputBar = parent.children[1];
    let task = inputBar.value;

    // user prompt for empty task input
    if (isEmpty(task)) {
        alert("The damn bar is empty, stupid.");
        return;
    }

    $.ajax({
        url: '/db/insert',
        type: 'POST',
        data: JSON.stringify(task),
        success: (res) => {
            console.log("Result: " + JSON.stringify(res));
        },
        error: (err) => {
            console.log("Failed at AJAX... " + JSON.stringify(err));
        }
    });
    inputBar.value = '';
}

function isEmpty(str) {
    return (!str
        || str.length == 0 
    );
}