 let template = document.querySelector("#uctemp").content;
 let page = 1;
 let lookingForData = false;

 function fetchData() {
     lookingForData = true;
     fetch("http://huset.albertopachecommd.com/wp-json/wp/v2/events?_embed&per_page=2&page="+page)
         .then(e => e.json())
         .then(showEvents)
 }

 function showEvents(data) {
     console.log(data)
     lookingForData=false;
     data.forEach(showSingleEvent)
     setTimeout(function () {
         let container = document.querySelector(".container");
         container.remove();
     }, 1000)

 }

 function showSingleEvent(anEvent) {
     //console.log(anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);

     let clone = template.cloneNode(true);

     clone.querySelector("h1").textContent = anEvent.title.rendered;
     clone.querySelector(".descript").innerHTML = anEvent.content.rendered;
     clone.querySelector(".price").textContent = anEvent.acf.price;
     clone.querySelector(".date").style.background;


     if (anEvent._embedded) { //image

         console.log(anEvent._embedded["wp:featuredmedia"]);
         clone.querySelector("img").setAttribute("src", anEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url);
     } else { // no image

         clone.querySelector("img").remove()
     }



     let eventlist = document.querySelector("#eventlist");
     eventlist.appendChild(clone);

 }

 fetchData();

 setInterval(function () {
     if (bottomVisible()&& lookingForData===false) {
         page++;
         fetchData();
     }
 }, 100)

 function bottomVisible() {
     const scrollY = window.scrollY
     const visible = document.documentElement.clientHeight
     const pageHeight = document.documentElement.scrollHeight
     const bottomOfPage = visible + scrollY >= pageHeight
     return bottomOfPage || pageHeight < visible
 }
