let template = document.querySelector("#uctemp").content;
let venuelist = document.querySelector("#venueList");

function fetchBooking() {


    let urlParams = new URLSearchParams(window.location.search);

    let catid = urlParams.get("category");
    console.log(catid);
    let endpoint = "http://huset.albertopachecommd.com/wp-json/wp/v2/rent_venue?_embed&per_page=6&page=1"
    if (catid) { // DRY
        endpoint = "http://huset.albertopachecommd.com/wp-json/wp/v2/rent_venue?_embed&per_page=6&page=1&categories=" + catid
    }
    console.log(endpoint);
    fetch(endpoint)
        .then(e => e.json())
        .then(buildVenues);


}

function buildVenues(data){
    console.log(data);
    data.forEach(showVenues);
}

function showVenues(venue){
    let clone = template.cloneNode(true);
    clone.querySelector(".rentTitle").textContent = venue.title.rendered;

    clone.querySelector(".venue_content").innerHTML = venue.content.rendered;

    venuelist.appendChild(clone);

}
fetchBooking();
