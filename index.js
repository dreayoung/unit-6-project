
document.addEventListener("DOMContentLoaded", () => {
    console.log('hey')

    let form = document.getElementById("search-form")
    form.addEventListener("submit", search)
})


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
    document.getElementById("pop-category-list").remove()
    document.getElementById("greeting").remove()
    for(let i = 0; i < 10; i++){
        let newContent = document.createElement("div")
        newContent.style.display = "flex"
        newContent.innerHTML = `
        <img width="auto" height="200px" src=${obj[i].image_url}/>
        <div>
        <h2>${obj[i].title}</h2> <span>${obj[i].score}</span>
        <h4>${obj[i].synopsis}</h4>
        <div>
        `
        console.log(obj[i].title)
        document.querySelector("body").append(newContent)
    }
     // fetch API
}

function searchResults(){
  // manipulate the DOM

}
