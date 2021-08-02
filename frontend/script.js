
const url = 'http://127.0.0.1:5000/animu';
const table = document.getElementById("anime-list");

function popAnimeList(url){
    fetch(url)
    .then(response => response.json())
    .then(data => {      
        // clear table body before populating
        table.getElementsByTagName("tbody")[0].innerHTML = "";
        for(let i in data){
            var row = table.getElementsByTagName("tbody")[0].insertRow();
            var c1 = row.insertCell(0);
            var c2 = row.insertCell(1)
            var c3 = row.insertCell(2);
            var c4 = row.insertCell(3);
            c1.innerHTML = data[i].title;
            c2.innerHTML = data[i].rating;
            c3.innerHTML = data[i].status;
            c4.innerHTML = data[i].comment;
        }
        
    }).catch(err => console.error("Error", err));
}

// Init the page and load all animes
popAnimeList(url);

// Load all anime
document.getElementById("allAnime").addEventListener("click", () => {
    popAnimeList('http://127.0.0.1:5000/animu')});

document.getElementById("ratingAnime").addEventListener("click", () => {
    popAnimeList('http://127.0.0.1:5000/animu?rating=1')});

document.getElementById("statusAnime").addEventListener("change", () => {
    var selected = document.getElementById("statusAnime").value;
    popAnimeList('http://127.0.0.1:5000/animu?status=' + selected)});

