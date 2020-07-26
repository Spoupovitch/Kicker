function showModal(id) {
    modalId = id + '_modal';
    document.getElementById(modalId).style.display='grid';
}

// allow closing of modal by clicking outside
window.onclick = function(e) {
    if(e.target == document.querySelector('.modal')) {
        document.querySelector('.modal').style.display = 'none';
    }
}