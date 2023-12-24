let pages = document.getElementById("pages")
let title = document.querySelector(".title")
let cards = document.querySelector(".randomCards")

for (let index = 1; index < 43; index++) {
    const option = document.createElement("option");
    option.value = `Page ${index}`
    option.innerText = `Page ${index}`
    pages.appendChild(option)
}
axios.get("https://rickandmortyapi.com/api/character?page=1")
    .then(response => printCharacter(response.data.results))
    .catch(error => printError(error.results))

pages.addEventListener("change", () => {
    cards.innerText = ""
    title.innerText = pages.value
    console.log(`https://rickandmortyapi.com/api/character?page=${pages.value[pages.value.length-1]}`)
    axios.get(`https://rickandmortyapi.com/api/character?page=${pages.value[pages.value.length-1]}`)
        .then(response => printCharacter(response.data.results))
        .catch(error => console.log(error))
})

function printCharacter(responseData){
    let character = responseData
    for (let element = 0; element < 21; element++) {
        let characterData = character[element]
        let div = document.createElement("div")
        let figure = document.createElement("figure")
        let img = document.createElement("img")
        let divText = document.createElement("div")
        let name = document.createElement("h2")
        let status = document.createElement("h3")
        let span = document.createElement("span")
        let icon = document.createElement("img")
        let specie = document.createElement("h4")
        let gender = document.createElement("h4")
        let location = document.createElement("h4")
        let type = document.createElement("h4")
        name.innerText = characterData.name
        img.src = characterData.image
        specie.innerText = `Specie: ${characterData.species}`
        span.innerText = `Status: ${characterData.status}`
        if(characterData.status === "Alive"){
            icon.src = "img/aliveEmoji.png"
        }
        else if(characterData.status === "Dead"){
            icon.src = "img/deadIcon.svg"
        }
        else{
            icon.src = "img/unknownEmoji.svg"
        }
        gender.innerText = `Gender: ${characterData.gender}`
        location.innerText = `Location: ${characterData.location.name}`
        if (!(characterData.type == "")){
            type.innerText = `Type: ${characterData.type}`
        }
        status.append(span, icon)
        figure.appendChild(img)
        divText.append(name, status, specie, gender, location, type)
        div.classList.add("card")
        div.append(figure, divText)
        cards.appendChild(div)
            
        };
    }
