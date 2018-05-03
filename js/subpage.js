let urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get("id");
console.log("i want to get article: " + id);


fetch("http://huset.albertopachecommd.com/wp-json/wp/v2/events/"+id+"?_embed")
  .then(e=>e.json())
  .then(showSinglePost)


function showSinglePost(aPost){
  console.log(aPost);
  document.querySelector("#singleEvent h1").textContent=aPost.title.rendered;

    document.querySelector(".descript").innerHTML = aPost.content.rendered;

    let priceTag = aPost.acf.price;
    if(priceTag==0){
        document.querySelector(".price").textContent = "FREE";
    }
    else{
        document.querySelector(".price").textContent = priceTag + " kr";
    }

    document.querySelector(".genre").textContent = aPost.acf.genre;
    document.querySelector(".location").textContent = aPost.acf.location;
    if (aPost._embedded["wp:featuredmedia"]) { //img is there
        document.querySelector(".subpage_img").setAttribute("src", aPost._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url)
    } else { // no img
        document.querySelector("img").remove()
    }



  //show carsection
  document.querySelector("#singleEvent").classList.add("slideInEvent");
}
