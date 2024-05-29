document.addEventListener('DOMContentLoaded', function () {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var overlayText = document.querySelector('.overlay-text');

    navbarToggler.addEventListener('click', function () {
        setTimeout(function() {
            overlayText.classList.toggle('blurred-text');
        })
    });
});