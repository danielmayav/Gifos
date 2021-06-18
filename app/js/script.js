// NAVBAR - HAMBUERGUER MENU
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
  searchBtn.style.alignSelf ="flex-start"
})
searchBar.addEventListener('blur', ()=> {
  searchBtn.style.alignSelf ="flex-end"
  
}) 

// REND MAIN
function rendMain () {
  if (FAVORITES_SECTION.classList.contains('section-act')) {
    FAVORITES_SECTION.classList.remove('section-act')
    FAVORITES_SECTION.classList.add('section-not-act')
    SEARCH_SECTION.classList.remove('section-not-act')
    SEARCH_SECTION.classList.add('section-act')
    
    }
   else {(MISGIFS_SECTION.classList.contains('section-act')) 
    MISGIFS_SECTION.classList.remove('section-act')
    MISGIFS_SECTION.classList.add('section-not-act');
    SEARCH_SECTION.classList.remove('section-not-act')
    SEARCH_SECTION.classList.add('section-act')
    
   }
   
}

// REND FAVORITES
function rendFavoritos () {
  console.log('function rendFavoritos')
  renderFavs()
  if (SEARCH_SECTION.classList.contains('section-act')) {
    FAVORITES_SECTION.classList.remove('section-not-act')
    FAVORITES_SECTION.classList.add('section-act')
    SEARCH_SECTION.classList.add('section-not-act')
    SEARCH_SECTION.classList.remove('section-act')
    }
   else {(MISGIFS_SECTION.classList.contains('section-act')) 
    MISGIFS_SECTION.classList.remove('section-act')
    MISGIFS_SECTION.classList.add('section-not-act');
    FAVORITES_SECTION.classList.remove('section-not-act')
    FAVORITES_SECTION.classList.add('section-act')
   }
   
}
// REND MIS GIFS
function rendMisgifs() {
  //console.log('mis gifos')
  if (SEARCH_SECTION.classList.contains('section-act')) {
    MISGIFS_SECTION.classList.remove('section-not-act')
    MISGIFS_SECTION.classList.add('section-act')
    SEARCH_SECTION.classList.add('section-not-act')
    SEARCH_SECTION.classList.remove('section-act')
    }
   else {(FAVORITES_SECTION.classList.contains('section-act')) 
    FAVORITES_SECTION.classList.remove('section-act')
    FAVORITES_SECTION.classList.add('section-not-act')
    MISGIFS_SECTION.classList.remove('section-not-act');
    MISGIFS_SECTION.classList.add('section-act')
   }
  }