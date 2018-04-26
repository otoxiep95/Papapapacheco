let template = document.querySelector("#uctemp").content;
let contactlist = document.querySelector("#contactList");

fetch("http://huset.albertopachecommd.com/wp-json/wp/v2/contact_page")
    .then(e=>e.json())
    .then(buildContact)

function buildContact(data){
    console.log(data);
    data.forEach(showContact);
}

function showContact(contact){
    let clone = template.cloneNode(true);
    clone.querySelector(".contactTitle").textContent = contact.title.rendered;

    clone.querySelector(".contact_content").innerHTML = contact.content.rendered;

    contactlist.appendChild(clone);

}
