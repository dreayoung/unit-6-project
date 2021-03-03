
document.addEventListener("DOMContentLoaded", () => {
    console.log('hey')

    let form = document.getElementById("search-form")
    form.addEventListener("submit", search)
})

function popAnime(obj){
    let anime = document.getElementById("pop-anime-img")
    anime.src = obj.image_url
}


function search(e){
    e.preventDefault()
    let input = document.getElementById("inp").value
    fetch(`https://api.jikan.moe/v3/search/anime?q=${input}`)
        .then(response => response.json())
        .then(data => {
            addTitles(data.results)
        })
    //document.getElementById("search-form").reset()
}

function addTitles(obj){
    console.log(obj)
    document.getElementById("pop-category-list").remove()
    document.getElementById("greeting").remove()

    obj.forEach(item => {
        let newContent = document.createElement("div")
        newContent.classList.add("card")
        newContent.style.display = "flex"

        newContent.innerHTML = `
        <div class='card_left'>
        <img src='${item.image_url}'>
      </div>
      <div class='card_right'>
        <h1>${item.title}</h1>
        <div class='card_right__details'>
          <ul>
            <li>${item.rated}</li>
            <li>episodes: ${item.episodes}</li>
            <li>${item.type}</li>
          </ul>
          <div class='card_right__rating'>
          </div>
          <div class='card_right__review'>
            <p>${item.synopsis}</p>
            <a href='' target='_blank'>Read more</a>
          </div>
          <div class='card_right__button'>
            <a href='' target='_blank'>WATCH TRAILER</a>
          </div>
        </div>
      </div>
      <br>
        `
        // console.log(item.title)
        document.querySelector("body").append(newContent)
    })
       
}

function searchResults(){
  // manipulate the DOM

}
