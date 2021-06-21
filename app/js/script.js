// NAVBAR - HAMBUERGUER MENU
hamburguerBtn.addEventListener('click', function(){
    console.log('click hamburguer');
    if (hamburguerBtn.classList.contains('hamburguer')){ //hambuerger is open
        hamburguerBtn.classList.remove('hamburguer');
        hamburguerBtn.classList.add('open-ham');
        overlay.style.display = "flex"
        body.style.overflowY = "hidden"
 
    }
    else if (hamburguerBtn.classList.contains('open-ham')){ // hambuerguer is close
        hamburguerBtn.classList.add('hamburguer');
        hamburguerBtn.classList.remove('open-ham');
        overlay.style.display = "none"
        body.style.overflowY = "scroll"
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
  renderMisGifs()
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