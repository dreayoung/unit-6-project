let booksAPI = APIkeys.booksKey
let movieAPI = APIkeys.moviesKey
document.addEventListener("DOMContentLoaded", () => {
  

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
              animeCards(data.results)
          })
  } 
  if(document.querySelector('input[name="selection"]:checked').value === "movie"){
    e.preventDefault()
    let input = document.getElementById("inp").value
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieAPI}&language=en-US&query=${input}&sort_by=popularity.desc`)
      .then(response => response.json())
      .then(data => {
        movieCards(data.results)
      })
  }
  if(document.querySelector('input[name="selection"]:checked').value === "book"){
    e.preventDefault()
    let input = document.getElementById("inp").value
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=${booksAPI}`)
        .then(response => response.json())
        .then(data => {
            bookCards(data.items)
        })
  }
}

function bookCards(obj){
  console.log(obj)
  if(document.querySelectorAll(".card")){
    document.querySelectorAll(".card").forEach(e => e.remove())
  }
  document.getElementById("inp").value = ""
  if(document.getElementById("greeting")){
    document.getElementById("pop-category-list").remove()
    document.getElementById("greeting").remove()      
  }

  let newContent = document.createElement("div")
  let listDiv = document.createElement("div")
  listDiv.classList.add("list-th")
  newContent.classList.add("container")

  document.querySelector("body").append(newContent)
  newContent.appendChild(listDiv)


}

function animeCards(obj){
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
        newContent.style.display = "flex"
        newContent.style.justifyContent = "center" 
        newContent.classList.add("card")
        newContent.style.margin = "15px"
        newContent.innerHTML = `
        <div class='card_left'>
          <img src='${item.image_url}'>
        </div>
        <div class='card_right'>
          <h1>${item.title}</h1>
          <div class='card_right__details'>
            <ul>
              <li>${item.rated}</li>
              <li>Episodes: ${item.episodes}</li>
              <li>${item.type}</li>
              <li>Score: ${item.score}</li>
            </ul>
            <div class='card_right__review'>
              <p>${item.synopsis}</p>
              <a href='${item.url}' target='_blank'>Read more</a>
            </div>
            <div class='card_right__button'>
              <a href='https://www.youtube.com/results?search_query=${item.title}+trailer' target='_blank'>WATCH TRAILER</a>
            </div>
          </div>
        </div>
          `
        document.querySelector("body").append(newContent)
    })
}

function movieCards(obj){
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
    console.log(item.original_title)
      let newContent = document.createElement("div")
      newContent.style.display = "flex"
      newContent.style.justifyContent = "center" 
      newContent.classList.add("card")
      newContent.style.margin = "15px"
      newContent.innerHTML = `
      <div class='card_left'>
        <img src='https://image.tmdb.org/t/p/w154/${item.poster_path}'>
      </div>
      <div class='card_right'>
        <h1>${item.original_title}</h1>
          <div class='card_right__details'>
          <ul>
            <li>Score: ${item.vote_average}</li>
            <li>Release Date: ${item.release_date}</li>
          </ul>
        <div class='card_right__review'>
          <p>${item.overview}</p>
        </div>          
          <div class='card_right__button'>
            <a href='https://www.youtube.com/results?search_query=${item.original_title}+trailer' target='_blank'>WATCH TRAILER</a>
          </div>
        </div>
      </div>
        `
      document.querySelector("body").append(newContent)
  })
}
