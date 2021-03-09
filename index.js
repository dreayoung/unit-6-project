let booksAPI = APIkeys.booksKey
let movieAPI = APIkeys.moviesKey
document.addEventListener("DOMContentLoaded", () => {

  let form = document.getElementById("search-form")
  form.addEventListener("submit", search)

  // let filterButton = document.getElementById("filters")
  // form.addEventListener("click", showFilters)
  
  let closeButton = document.getElementById("modal-close")
  closeButton.addEventListener("click", close)
  console.log("test", closeButton)

})

function bookSearch(e){
  e.preventDefault()
  let selected = document.getElementById("book-search").value
}

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
              console.log(data)
          })
  } 
  if(document.querySelector('input[name="selection"]:checked').value === "movie"){
    e.preventDefault()
    let input = document.getElementById("inp").value
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${movieAPI}&language=en-US&query=${input}&sort_by=popularity.desc`)
      .then(response => response.json())
      .then(data => {
        movieCards(data.results)
        console.log(data)
      })
  }
  if(document.querySelector('input[name="selection"]:checked').value === "book"){
    e.preventDefault()
    let input = document.getElementById("inp").value
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=${booksAPI}`)
        .then(response => response.json())
        .then(data => {
            bookCards(data.items)
            console.log(data)
        })
  }
}

function bookCards(obj){
  if(document.querySelectorAll(".card")){
    document.querySelectorAll(".card").forEach(e => e.remove())
  }
  document.getElementById("inp").value = ""
  if(document.getElementById("greeting")){
    document.getElementById("pop-category-list").remove()
    document.getElementById("greeting").remove()      
  }
  obj.forEach(book => {
    let newContent = document.createElement("div")
    newContent.style.display = "flex"
    newContent.style.justifyContent = "center" 
    newContent.classList.add("card")
    newContent.style.margin = "15px"
    newContent.innerHTML = `
    <div class='card_left'>
    <img src='${book.volumeInfo.imageLinks.thumbnail}'>
  </div>
  <div class='card_right'>
    <h1>${book.volumeInfo.title}</h1>
    <div class='card_right__details'>
      <ul>
        <li>Categories: ${book.volumeInfo.categories}</li>
        <li>Ratings: ${book.volumeInfo.averageRating}</li>
        <li>Author: ${book.volumeInfo.authors}</li>
      </ul>
      <div class='card_right__rating'>
      </div>
      <div class='card_right__review'>
        <p>${book.volumeInfo.description}</p>
        <a href='https://openlibrary.org/search?q=${book.volumeInfo.title}&mode=everything' target='_blank'>Read more</a>
      </div>
    </div>
  </div>
  <br>
    `
    document.querySelector("body").append(newContent)
})
}

function animeCards(obj){
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
              <button class="sources-button">Click for Sources</button>
            </div>
          </div>
        </div>
          `
        document.querySelector("body").append(newContent)
        document.querySelectorAll(".sources-button").forEach(button => {
        button.addEventListener("click", getId)
        })
    })
}

function movieCards(obj){
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
            <button class="sources-button">Click for Sources</button>
          </div>
        </div>
      </div>
        `
      document.querySelector("body").append(newContent)
      document.querySelectorAll(".sources-button").forEach(button => {
      button.addEventListener("click", getId)
      })
  })
}

function getId(e){
  let ul = document.getElementById("listOfSources")
  while(ul.firstChild) ul.removeChild(ul.firstChild)
  let name = e.currentTarget.parentNode.parentNode.parentNode.querySelector("h1").innerText
  fetch(`https://api.watchmode.com/v1/search/?apiKey=X70LNJKbgAnhP8o5xOp8d4HxqsozDdmxGWhBBXYd&search_field=name&search_value=${name}`)
    .then(response => response.json())
    .then(data => {
      sources(data)
    })
    document.getElementById("modal-holder").style.display = "block"
    e.currentTarget.parentNode.parentNode.parentNode.parentNode.append(document.getElementById("modal-holder"))
}

function sources(obj){
  fetch(`https://api.watchmode.com/v1/title/${obj.title_results[0].id}/sources/?apiKey=X70LNJKbgAnhP8o5xOp8d4HxqsozDdmxGWhBBXYd&regions=US`)
    .then(response => response.json())
    .then(data => {
      displaySources(data)})
}

function displaySources(data){
  let sourcesobj = {
    203: "Netflix",
    157: "Hulu",
    26: "Amazon Prime",
    387: "HBO Max",
    372: "Disney+",
    80: "Crunchyroll Premium",
    380: "Funimation",
    345: "Youtube",
    140: "Googleplay Store",
    24: "Amazon Purchase",
    344: "Youtube Purchase"
  }
  let uniqueURLs = {}
  for(let i = 0; i < data.length; i++){
    if(data[i].source_id in sourcesobj){
      if(!(data[i].web_url in uniqueURLs)){
        uniqueURLs[data[i].web_url] = true
      }
    }
  }
  if(document.getElementById("modal-holder").style.display === "block"){
  }
  for(let j in uniqueURLs){
    let li = document.createElement("li")
    let anchor = document.createElement("a")
    anchor.className = "sourcesLi"
    li.innerText = j
    anchor.href = j
    anchor.target = "_blank"
    anchor.append(li)
    document.getElementById("modal").querySelector("ul").append(anchor)
  }
}


function close(){
    console.log("hey")
  let ul = document.getElementById("listOfSources")
  while(ul.firstChild) ul.removeChild(ul.firstChild)
}


// function showFilters(){
//   document.getElementById(){

//   }
// }
// 20210308142649
// https://api.watchmode.com/v1/sources/?apiKey=X70LNJKbgAnhP8o5xOp8d4HxqsozDdmxGWhBBXYd&regions=US

