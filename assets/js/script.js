// fade out for modal elements during wipe left
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
    
    // TODO - clean this up
    if (id == 'to_do') {
        document.getElementById(id + '_modal').style.gridTemplateColumns='repeat(2, 1fr)';
        populateToDoList();
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
        case 'num_puzzles':
        case 'calculator':
            showCategoryLinks(category, parent);
            break;

        case 'calisthenics':
        case 'cardio':
        case 'weights':
        case 'yoga':
            showRandomExercise(category, siblings, parent);
            break;

        case 'random':
            let exercises = ['calisthenics', 'cardio', 'weights', 'yoga'];
            let randomIdx = Math.floor(Math.random() * exercises.length);
            showRandomExercise(exercises[randomIdx], siblings, parent);
            break;

        default:
            closeModal();
            console.log('The given category [' + category + '] is not recognized.');
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

// allow closing of modal by clicking outside of it
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

// retrieve to do list tasks from db table, add tasks to list element
function populateToDoList() {
    // prevent adding duplicate tasks to screen
    if (document.getElementById('to_do_list').children.length > 0) {
        return;
    }

    $.ajax({
        url: '/db/read',
        type: 'POST',
        success: function (res) {
            console.log(res);
        },
        error: function (err) {
            console.log(err);
        }
    }).then(ans => {
        ans.forEach(task => {
            let li = document.createElement("li");
            li.setAttribute('id', task.task_id);
            li.setAttribute('innerHTML', task.task_desc);
            document.getElementById('to_do_list').appendChild(li);
        });
    });
}

// augment to do list
function addTaskToList() {
    let inputBar = document.getElementById('task_input');
    inputBar.value = $('task_input').val();
console.log("type: " + typeof(inputBar.value));
console.log("task to send: " + inputBar.value);
    // user prompt for empty task input
    if (isEmpty(inputBar.value)) {
        alert("The damn bar is empty, stupid.");
        return;
    }
    let task = { 
        'task': inputBar.value 
    };

    $.ajax({
        url: '/db/insert',
        type: 'POST',
        dataType: 'json',
        body: JSON.stringify(task),
        success: function(res) {
            console.log("Result: " + JSON.stringify(res));
            // reset input
            inputBar.value = '';
        },
        error: function(err) {
            console.log("Failed at AJAX... " + JSON.stringify(err));
        }
    });

}

// utility method returns true for misc empty string input
function isEmpty(str) {
    return (!str
        || str.length == 0
        || typeof(str) != "string"
    );
}

// 
function updateFinanceModalFields() {
    updateFederalTax();
    updateStateTax();
}

// update finance field values
function updateFederalTax() {
    let salary = $("#salary").val();
    let taxPerBrkt = getFederalTaxPerBrkt(salary);
    let taxSum = 0;
    const HOUSING_PCT = .3;
    const _401k_PCT = .2;

    for (let i = 0; i < taxPerBrkt.length; ++i) {
        taxSum += taxPerBrkt[i];
    }
    
    $("#tax_amt").val(taxSum.toFixed(2));
    // income_tax = tax_amount / salary
    $("#inc_tax").val( (taxSum / salary).toPrecision(2) );
    // post-tax_income = salary - tax_amount
    $("#inc_after_tax").val( (salary - taxSum).toFixed(2) );
    // amount_for_401k = salary * pct_for_401k (401k is pre-tax)
    $("#_401K_amt").val( (salary * _401k_PCT).toFixed(2) );
    // amount_for_rent = (post-tax_income - amount_for_401k) * pct_for_rent
    let rentAlltmt = ( $("#inc_after_tax").val() - $("#_401K_amt").val() ) * HOUSING_PCT;
    $("#rent_alltmt").val(rentAlltmt.toFixed(2));
    // per_month_for_rent = amount_for_rent / 12
    $("#rent_alltmt_per_mth").val( (rentAlltmt / 12).toFixed(2) );
}

function updateStateTax() {
    
}

// updated for 2021
// returns tax paid per bracket for tax year 2020
function getFederalTaxPerBrkt(salary) {
    // update only ceiling0, where ceiling0 = floor1 - 1
    const brkt6Tax = .35, brkt6Floor = 209426;
    const brkt5Tax = .32, brkt5Floor = 164926, brkt5Ceil = brkt6Floor - 1;
    const brkt4Tax = .24, brkt4Floor = 86376, brkt4Ceil = brkt5Floor - 1;
    const brkt3Tax = .22, brkt3Floor = 40526, brkt3Ceil = brkt4Floor - 1;
    const brkt2Tax = .12, brkt2Floor = 9951, brkt2Ceil = brkt3Floor - 1;
    const brkt1Tax = .1, brkt1Floor = 0, brkt1Ceil = brkt2Floor - 1;

    let arr = [];

    if (salary > brkt5Ceil) {
        arr[0] = brkt1Ceil * brkt1Tax;
        arr[1] = (brkt2Ceil - brkt2Floor) * brkt2Tax;
        arr[2] = (brkt3Ceil - brkt3Floor) * brkt3Tax;
        arr[3] = (brkt4Ceil - brkt4Floor) * brkt4Tax;
        arr[4] = (brkt5Ceil - brkt5Floor) * brkt5Tax;
        arr[5] = (salary - brkt6Floor) * brkt6Tax;
    }
    else if (salary > brkt4Ceil) {
        arr[0] = brkt1Ceil * brkt1Tax;
        arr[1] = (brkt2Ceil - brkt2Floor) * brkt2Tax;
        arr[2] = (brkt3Ceil - brkt3Floor) * brkt3Tax;
        arr[3] = (brkt4Ceil - brkt4Floor) * brkt4Tax;
        arr[4] = (salary - brkt5Floor) * brkt5Tax;
    }
    else if (salary > brkt3Ceil) {
        arr[0] = brkt1Ceil * brkt1Tax;
        arr[1] = (brkt2Ceil - brkt2Floor) * brkt2Tax;
        arr[2] = (brkt3Ceil - brkt3Floor) * brkt3Tax;
        arr[3] = (salary - brkt4Floor) * brkt4Tax;
    }
    else if (salary > brkt2Ceil) {
        arr[0] = brkt1Ceil * brkt1Tax;
        arr[1] = (brkt2Ceil - brkt2Floor) * brkt2Tax;
        arr[2] = (salary - brkt3Floor) * brkt3Tax;
    }
    else if (salary > brkt1Ceil) {
        arr[0] = brkt1Ceil * brkt1Tax;
        arr[1] = (salary - brkt2Floor) * brkt2Tax;
    }
    else {
        arr[0] = salary * brkt1Tax;
    }
    return arr;
}