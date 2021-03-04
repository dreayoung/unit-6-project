
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
  if(document.querySelector('input[name="selection"]:checked') === null){
    e.preventDefault()
    alert("Please Select Where to Search")
  }
  if(document.querySelector('input[name="selection"]:checked').value === "anime"){
      e.preventDefault()
      let input = document.getElementById("inp").value
      fetch(`https://api.jikan.moe/v3/search/anime?q=${input}`)
          .then(response => response.json())
          .then(data => {
              addTitles(data.results)
          })
  } 
  if(document.querySelector('input[name="selection"]:checked').value === "movie"){
    e.preventDefault()
    let input = document.getElementById("inp").value
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=bb90a4dd7b57f36e2474a82d40bd5bf8&language=en-US&query=${input}`)
      .then(response => response.json())
      .then(data => {
        data.results.forEach(titles => {
          console.log(titles.title)
        })
      })
  }
  if(document.querySelector('input[name="selection"]:checked').value === "book"){
    e.preventDefault()
    console.log("not made yet")
  }
}

function addTitles(obj){
    console.log(obj)
    if(document.querySelectorAll(".card")){
      document.querySelectorAll(".card").forEach(e => e.remove())
    }
    document.getElementById("inp").value = ""
    if(document.getElementById("greeting")){
      document.getElementById("pop-category-list").remove()
      document.getElementById("greeting").remove()      
    }
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
        document.querySelector("body").append(newContent)
    })
       
}


