// Меню бургуер

const iconMenu = document.querySelector('.menu__icon');
if (iconMenu) {
  const menuBody = document.querySelector('.menu__body');

  iconMenu.addEventListener ('click', function() {
    menuBody.classList.toggle('_active');
    iconMenu.classList.toggle('_active');
    document.body.classList.toggle('_lock');
  })
}

// Меню бургуер end


// таймер гг:хх:сс
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${String(hours)}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// оновлення таймера

function updateTimer() {
  const now = new Date().getTime();
  const endTime = localStorage.getItem('endTime');

  if (!endTime) {
    const initialTime = 2 * 60 * 60 * 1000;
    localStorage.setItem('endTime', now + initialTime);
    return;
  }

  const remainingTime = Math.max(0, endTime - now);
  const seconds = Math.floor(remainingTime / 1000);

  document.getElementById('timer').textContent = formatTime(seconds);

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    localStorage.removeItem('endTime');
  }
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

// оновлення таймера end

//маска для телефона
const phoneMask = document.getElementById('phone');

IMask(
  phoneMask,
  { mask: '+{38(\\000)} 000-00-00'}
)
// маска end


// data

const today = new Date();
let day = today.getDate().toString().padStart(2, '0');
let month = (today.getMonth() + 1).toString().padStart(2, '0');
let year = today.getFullYear();

const dataContainer = document.getElementById('date');

const formattedDate = day + '.' + month + '.' + year;
dataContainer.textContent = formattedDate;

// data end


//якоря

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

if(menuLinks.length > 0) {
  console.log(menuLinks);

  menuLinks.forEach(menuLink => {
    menuLink.addEventListener('click', onMenuLinkClick);
  })

  function onMenuLinkClick(event) {
    const menuLink = event.target;
    const menuBody = document.querySelector('.menu__body');

    menuBody.classList.remove('_active');
    iconMenu.classList.remove('_active');
    document.body.classList.remove('_lock');

    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);

      let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

      if (window.matchMedia("(max-width: 787px)").matches) {
        gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;
      }

      window.scrollTo ({
        top: gotoBlockValue,
        behavior: "smooth",
      })

      event.preventDefault();
    }
  }
}
