
document.addEventListener("DOMContentLoaded", () => {
    console.log('hey')

    let form = document.getElementById("search-form")
    form.addEventListener("submit", tester)
})


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
