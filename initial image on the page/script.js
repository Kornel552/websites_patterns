document.addEventListener('DOMContentLoaded', function () {
   var navbarToggler = document.querySelector('.navbar-toggler');
   var overlayText = document.querySelector('.overlay-text');

   navbarToggler.addEventListener('click', function () {
       setTimeout(function() {
           overlayText.classList.toggle('blurred-text');
       });
   });
});

document.addEventListener('click', function(event) {
   var isNavLink = event.target.classList.contains('nav-link');
   var isNavbarBrand = event.target.classList.contains('navbar-brand'); // Dla "Sticky top"
   var navbarToggler = document.querySelector('.navbar-toggler');
   var isNavbarTogglerCollapsed = navbarToggler.getAttribute('aria-expanded') === 'false';
   var clickedInsideNavbar = navbarToggler.contains(event.target) || event.target.closest('.navbar');

   // Sprawdź, czy kliknięto "Sticky top"
   if (isNavbarBrand) {
       event.preventDefault(); // Zapobiegaj domyślnej akcji przeglądarki dla "Sticky top"

       // Sprawdź, czy pasek jest rozwinięty i zwiń go
       if (!isNavbarTogglerCollapsed) {
           navbarToggler.click();
       }

       // Przewiń stronę do góry bez opóźnienia
       window.scrollTo({ top: 0, behavior: 'smooth' });
   }
   else if (isNavLink && !isNavbarTogglerCollapsed) {
       event.preventDefault();
       var targetSection = event.target.getAttribute('href');

       // Zwiń pasek nawigacyjny
       navbarToggler.click();

       // Dla linków nawigacyjnych, przewiń do sekcji
       setTimeout(function() {
           var targetElement = document.querySelector(targetSection);
           if (targetElement) {
               window.scrollTo({ top: targetElement.offsetTop - 210, behavior: 'smooth' }); // Uwzględnij margines
           }
       }, 50);
   }
   // Jeśli kliknięto poza paskiem nawigacyjnym i pasek jest rozwinięty, zwiń go
   else if (!clickedInsideNavbar && !isNavbarTogglerCollapsed) {
       navbarToggler.click();
   }
});
