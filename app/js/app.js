const apiKey = "qgKLO2sdzTr5Cniqn4m1BUGs6UiWP5bl";
const searchResult = document.getElementById('results');

searchGif.addEventListener('submit', function(e){
   e.preventDefault()
   const q = searchBar.value
   search(q)
   searchBar.value = ''
})


async function search (q){
    const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=12`;
    console.log(searchPath)
    searchResult.innerHTML = ''
    await fetch(searchPath)
        .then(function(res){
            return res.json()
        })
        .then(function(json){   
            let resultHTML = ''
            let  searchTitle = `<h2>${q}</h2>`
            json.data.forEach(function(obj){
                const titlePath = obj.title
                const urlPath = obj.images.downsized.url;
                resultHTML += `
                <img
                class="gif"
                src="${urlPath}"
                alt="${titlePath}"
                >`
               
                /* resultHTML = document.createElement("img")
                resultHTML.src = urlPath;
                resultHTML.classList.add('gif')
                searchResult.appendChild(resultHTML) */
                
            })
            searchResult.innerHTML = searchTitle + resultHTML;
            if (searchResult.innerHTML === `<h2>${q}</h2>`){
                
                searchResult.innerHTML = `<h2>${q}</h2>
                <img
                src=/assets/icon-busqueda-sin-resultado.svg
                >
                <p>Intenta con otra búsqueda.</p>`
            }
            }) .catch (function(err){
                console.log(err.message)
        })
}


