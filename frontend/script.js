
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
            var c5 = row.insertCell(4);
            row.id = data[i].id;
            c1.innerHTML = data[i].title;
            c2.innerHTML = data[i].rating;
            c3.innerHTML = data[i].status;
            c4.innerHTML = data[i].comment;
            c5.innerHTML = 
                "<button id=\"edit"+ row.id +"\" onclick=\"editAnime(this)\" class=\"menu-mini\">edit</button> \
                <button id=\"save"+ row.id +"\" onclick=\"saveAnime(this)\" class=\"menu-mini\" hidden>save</button> \
                <button onclick=\"deleteAnime(this)\" class=\"menu-mini\">del</button>"
        }
        
    }).catch(err => console.error("Error", err));
}

// Init the page and load all animes
document.getElementsByTagName("body").onload = popAnimeList(url);

// Load all anime
document.getElementById("allAnime").addEventListener("click", () => {
    popAnimeList(url)});

// Order by rating
document.getElementById("ratingAnime").addEventListener("click", () => {
    popAnimeList(url + '?rating=1')});

// Get anime by status
document.getElementById("statusAnime").addEventListener("change", () => {
    var selected = document.getElementById("statusAnime").value;
    popAnimeList(url + '?status=' + selected)});

// Delete anime by ID
function deleteAnime(e){
    id = e.parentNode.parentNode.id;
    // TODO: are you sure?
    // var b = document.createElement("button");
    // b.classList.add("menu-mini");
    // var t = document.createTextNode("no");
    // b.appendChild(t);
    // e.parentNode.append(b);
    // e.innerHTML = "yes";
    
    fetch(url + "/" + id, {
        method: "DELETE"
    });
};

// Add anime button
const addAnime = document.getElementById("addAnime");
const animeForm = document.getElementById("animeForm");

addAnime.addEventListener("click", () =>
    animeForm.toggleAttribute("hidden")
);

// POST an anime
animeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    var bodyData = new FormData(animeForm);
    var object = {};
    bodyData.forEach((value, key) => object[key] = value);
    var animeJson = JSON.stringify(object);

    const r = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: animeJson
    });
    const result = await r.json();
    console.log(result);
    // reset form after submission
    animeForm.reset();
});

// Edit anime in the table
function editAnime(e){
    const rowId = e.parentNode.parentNode.id;

    var title = document.getElementById(rowId).cells[0];
    var rating = document.getElementById(rowId).cells[1];
    var status = document.getElementById(rowId).cells[2];
    var comment = document.getElementById(rowId).cells[3];

    // toggle edit/save
    document.getElementById("edit" + rowId).toggleAttribute("hidden");
    document.getElementById("save" + rowId).toggleAttribute("hidden");
    // get cell data
    var curTitle = document.getElementById(rowId).cells[0].innerHTML;
    var curRating = document.getElementById(rowId).cells[1].innerHTML;
    var curStatus = document.getElementById(rowId).cells[2].innerHTML;
    var curComment = document.getElementById(rowId).cells[3].innerHTML;
    
    // cell data editable
    title.innerHTML = "<input id='title"+ rowId +"' type=\"text\" placeholder=\"Title\" required name=\"title\" value='"+ curTitle +"'>"
    rating.innerHTML = "\
    <select id='rating"+ rowId +"' name='rating'> \
        <option value='-'>-</option> \
        <option value='1'>1</option> \
        <option value='2'>2</option> \
        <option value='3'>3</option> \
        <option value='4'>4</option> \
        <option value='5'>5</option> \
        <option value='6'>6</option> \
        <option value='7'>7</option> \
        <option value='8'>8</option> \
        <option value='9'>9</option> \
        <option value='10'>10</option> \
    </select>"
    var selectRating = document.getElementById("rating" + rowId);
    selectRating.value = curRating;

    status.innerHTML = "\
    <select id='status" + rowId + "' name='status'> \
        <option value='Status' selected disabled>Status</option> \
        <option value='Completed'>Completed</option> \
        <option value='Watching'>Watching</option> \
        <option value='Planning'>Planning</option> \
        <option value='Dropped'>Dropped</option> \
    </select>"
    var selectStatus = document.getElementById("status" + rowId);
    selectStatus.value = curStatus;

    comment.innerHTML = "<input type='text' id='comment" + rowId + "' placeholder='Comment' name='comment' value=" + curComment + ">"
};

// Save edited anime and PUT request
async function saveAnime(e){
    const rowId = e.parentNode.parentNode.id;

    var title = document.getElementById("title" + rowId).value;
    var rating = document.getElementById("rating" + rowId).value;
    var status = document.getElementById("status" + rowId).value;
    var comment = document.getElementById("comment" + rowId).value;

    var object = {
        "title": title,
        "rating": rating,
        "status": status,
        "comment": comment
        };

    const r = await fetch(url + "/" + rowId, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(object)
    });
    const result = await r.json();
    console.log(result);
    
    // this reloads the page if no changes occur
    popAnimeList(url);
}