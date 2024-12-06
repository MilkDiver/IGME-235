let displayTerm = "";


// 1
window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};

 const savedTerm = localStorage.getItem("searchTerm");
    if (savedTerm) {
        document.querySelector("#searchterm").value = savedTerm;
        displayTerm = savedTerm;
        document.querySelector("#status").innerHTML = `<b>Loaded previous search term: '${savedTerm}'</b>`;
    }

//3
//Searches the user-inputted term once the search button is clicked!
function searchButtonClicked() {
    console.log("searchButtonClicked() called");

    //1
    const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon/";

    //4
    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    // Save the search term in localStorage
    localStorage.setItem("searchTerm", displayTerm);

    //5
    term = term.trim().toLowerCase();

    //6
    term = encodeURIComponent(term);

    //7
    if (term.length < 1) return;

    //8
    let url = POKEAPI_URL + term;

    //10
    document.querySelector("#status").innerHTML = `<b>Searching for '${displayTerm}'</b>`;

    //11
    console.log(url);

    //12
    getData(url);
}

//Gets the data from a URL.
function getData(url) {
    //1
    let xhr = new XMLHttpRequest();

    //2
    xhr.onload = dataLoaded;

    //3
    xhr.onerror = dataError;

    //4
    xhr.open("GET", url);
    xhr.send();
}

//Loads the data!
function dataLoaded(e) {
    //5
    let xhr = e.target;

    //I think it's good practice to use a try statement here.
    try {

        //7
        let obj = JSON.parse(xhr.responseText);
        console.log(obj);

        //8
        if (!obj) {
            document.querySelector("#status").innerHTML = `<b>No results found for '${displayTerm}'</b>`;
            return;
        }

        // Display the searched Pokémon's data
        // 9-15
        let name = obj.name.charAt(0).toUpperCase() + obj.name.slice(1);
        let image = obj.sprites.front_default;
        let types = obj.types.map(typeInfo => typeInfo.type.name).join(", "); //.map is really useful.
        let abilities = obj.abilities.map(abilityInfo => abilityInfo.ability.name).join(", "); //This line had no business taking as long to figure out as it did, but I got it!
        let weight = obj.weight / 10;
        let height = obj.height / 10;

        let resultHTML = `<div class='result'>
                            <h2>${name}</h2>
                            <img src='${image}' alt='${name}' />
                            <p><strong>Types:</strong> ${types}</p>
                            <p><strong>Abilities:</strong> ${abilities}</p>
                            <p><strong>Weight:</strong> ${weight} kg</p>
                            <p><strong>Height:</strong> ${height} m</p>
                         </div>`;

        //16
        document.querySelector("#content").innerHTML = resultHTML;

        //17
        document.querySelector("#status").innerHTML = "<b>Success!</b>";
    } catch (error) {
        document.querySelector("#status").innerHTML = `<b>Error loading data for '${displayTerm}'</b>`;
        console.error("Parsing error: ", error);
    }
}

//Informs if the data had an error.
function dataError(e) {
    console.log("An error occurred");
    document.querySelector("#status").innerHTML = `<b>An error occurred while searching for '${displayTerm}'</b>`;
}
