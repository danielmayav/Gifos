
// NAVBAR - HAMBUERGUER MENU

const body = document.body;
const hamburguerBtn = document.querySelector('#hamburguerBtn');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelector('#nav-links');
const main = document.querySelector('.main');
const searchBar = document.querySelector('#searchBar');
const searchBtn = document.querySelector('#searchBtn');
const searchGif = document.querySelector('#searchGif');

hamburguerBtn.addEventListener('click', function(){
    console.log('click hamburguer');
    if (hamburguerBtn.classList.contains('hamburguer')){ //hambuerger is open
        hamburguerBtn.classList.remove('hamburguer');
        hamburguerBtn.classList.add('open-ham');
        overlay.classList.add('overlay-animation');
        //Nav links
        navLinks.classList.add('nav-links');
        navLinks.classList.remove('hide-for-mobile');
    }
    else { // hambuerguer is close
        hamburguerBtn.classList.add('hamburguer');
        hamburguerBtn.classList.remove('open-ham');
        overlay.classList.remove('overlay-animation');
        //Nav links
        navLinks.classList.remove('nav-links');
        navLinks.classList.add('hide-for-mobile')
    }
    
});

// =====  SEARCH BAR BUTTON STYLE

searchBar.addEventListener('focus', () => {
  searchBtn.style.right =""
  searchBtn.style.left ="30vw"
})
/* searchBar.addEventListener('blur', ()=> {
  searchBtn.style.left =""
  searchBtn.style.right ="30vw"
  }) */


