let booksAPI = 'AIzaSyCQ81WFQIGRAWpP5TIgm_7s5Em6Jpwk6N4'

document.addEventListener("DOMContentLoaded", () => {
  

    let form = document.getElementById("search-form")
    form.addEventListener("submit", search)
    
})

function popAnime(obj){
    let anime = document.getElementById("pop-anime-img")
    anime.src = obj.image_url
}

function search(e){
e.preventDefault()

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
    console.log("not made yet")
  }
  if(document.querySelector('input[name="selection"]:checked').value === "book"){
    e.preventDefault()
    let input = document.getElementById("inp").value
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&key=${booksAPI}`)
        .then(response => response.json())
        .then(data => {
            bookCards(data.items)
            // console.log(data.items[0])
        })
  }
  else if(document.querySelector('input[name="selection"]:checked').value === null){
    e.preventDefault()
    console.log("Please Select Type of Search")
  }
      //document.getElementById("search-form").reset()
}

function bookCards(obj){
  document.getElementById("pop-category-list").remove()
  document.getElementById("greeting").remove()

  obj.forEach(book => {
    let newContent = document.createElement("div")
    newContent.classList.add("card")
    newContent.style.display = "flex"

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
        document.querySelector("body").append(newContent)
    })
       
}


