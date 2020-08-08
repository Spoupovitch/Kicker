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

// redirect to media of type chosen by user
function mediaFromCategory(id) {

}