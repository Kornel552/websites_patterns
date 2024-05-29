document.addEventListener('DOMContentLoaded', function () {
    var navbarToggler = document.querySelector('.navbar-toggler');
    var overlayText = document.querySelector('.overlay-text');

    navbarToggler.addEventListener('click', function () {
        setTimeout(function() {
            overlayText.classList.toggle('blurred-text');
        })
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




body {
  background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
  height: 100vh;
  overflow: hidden;
  display: flex;
  font-family: 'Anton', sans-serif;
  justify-content: center;
  align-items: center;
}

$shooting-time: 3000ms;

.night {
  position: relative;
  width: 100%;
  height: 100%;
  transform: rotateZ(45deg);
  // animation: sky 200000ms linear infinite;
}

.shooting_star {
  position: absolute;
  left: 50%;
  top: 50%;
  // width: 100px;
  height: 2px;
  background: linear-gradient(-45deg, rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
  animation:
    tail $shooting-time ease-in-out infinite,
    shooting $shooting-time ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    // width: 30px;
    height: 2px;
    background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    animation: shining $shooting-time ease-in-out infinite;
  }

  &::after {
    // CodePen Error
    // @extend .shooting_star::before;

    content: '';
    position: absolute;
    top: calc(50% - 1px);
    right: 0;
    // width: 30px;
    height: 2px;
    background: linear-gradient(-45deg, rgba(0, 0, 255, 0), rgba(95, 145, 255, 1), rgba(0, 0, 255, 0));
    transform: translateX(50%) rotateZ(45deg);
    border-radius: 100%;
    animation: shining $shooting-time ease-in-out infinite;
    transform: translateX(50%) rotateZ(-45deg);
  }

  @for $i from 1 through 20 {
    &:nth-child(#{$i}) {
      $delay: random(9999) + 0ms;
      top: calc(50% - #{random(400) - 200px});
      left: calc(50% - #{random(300) + 0px});
      animation-delay: $delay;
      // opacity: random(50) / 100 + 0.5;

      &::before,
      &::after {
        animation-delay: $delay;
      }
    }
  }
}

@keyframes tail {
  0% {
    width: 0;
  }

  30% {
    width: 100px;
  }

  100% {
    width: 0;
  }
}

@keyframes shining {
  0% {
    width: 0;
  }

  50% {
    width: 30px;
  }

  100% {
    width: 0;
  }
}

@keyframes shooting {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(300px);
  }
}

@keyframes sky {
  0% {
    transform: rotate(45deg);
  }

  100% {
    transform: rotate(45 + 360deg);
  }
}