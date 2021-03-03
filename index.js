
document.addEventListener("DOMContentLoaded", () => {
    console.log('hey')

    let form = document.getElementById("search-form")
    form.addEventListener("submit", tester)

    fetch('https://api.jikan.moe/v3/anime/1').then(response => response.json())
    .then(data => popAnime(data))
})

function popAnime(obj){
    let anime = document.getElementById("pop-anime-img")
    anime.src = obj.image_url
}


function tester(e){
    e.preventDefault()
    document.getElementById("search-form").reset()

    // get value of input text and pass it into searchAPI()
    
    searchAPI()
}

function searchAPI(){
    document.getElementById("pop-category-list").remove()
    document.getElementById("greeting").remove()

     // fetch API
}

function searchResults(){
  // manipulate the DOM

}
