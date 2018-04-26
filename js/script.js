let template = document.querySelector("#uctemp").content;
let eventlist = document.querySelector("#eventlist");
let page = 1;
let lookingForData = false;

function fetchEvents() {
    lookingForData = true;

    let urlParams = new URLSearchParams(window.location.search);

    let catid = urlParams.get("category");
    console.log(catid);
    let endpoint = "http://huset.albertopachecommd.com/wp-json/wp/v2/events?_embed&per_page=2&page=" + page
    if (catid) { // DRY
        endpoint = "http://huset.albertopachecommd.com/wp-json/wp/v2/events?_embed&per_page=2&page=" + page + "&categories=" + catid
    }
    console.log(endpoint);
    fetch(endpoint)
        .then(e => e.json())
        .then(showEvents);


}

function showEvents(data) {
    console.log(data)
    lookingForData = false;
    data.forEach(showSingleEvent);
}

function showSingleEvent(anEvent) {
    let clone = template.cloneNode(true);
    clone.querySelector("h1").textContent = anEvent.title.rendered;
    clone.querySelector(".descript").innerHTML = anEvent.content.rendered;

    let priceTag = anEvent.acf.price;
    if(priceTag==0){
        clone.querySelector(".price").textContent = "FREE";
    }
    else{
        clone.querySelector(".price").textContent = priceTag + " kr";
    }

    clone.querySelector(".genre").textContent = anEvent.acf.genre;
    clone.querySelector(".location").textContent = anEvent.acf.location;
    if (anEvent._embedded["wp:featuredmedia"]) { //img is there
        clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { // no img
        clone.querySelector("img").remove()
    }

    clone.querySelector('.readmore').href = "subpage.html?id=" + anEvent.id;


    eventlist.appendChild(clone);
}

fetchEvents();

setInterval(function(){

  if(bottomVisible() && lookingForData===false){
    console.log("We've reached rock bottom, fetching articles")
    page++;
    fetchEvents();
  }
}, 1000)

function bottomVisible() {
  const scrollY = window.scrollY
  const visible = document.documentElement.clientHeight
  const pageHeight = document.documentElement.scrollHeight
  const bottomOfPage = visible + scrollY >= pageHeight
  return bottomOfPage || pageHeight < visible
}
