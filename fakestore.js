"use strict";


let schoolEL = document.getElementById("school");
let programEL = document.getElementById("program");
let varukorgenEL = document.getElementById("showitems");

const nameEL = document.getElementById("buyername");
const emailEL = document.getElementById("email");
const addressEL = document.getElementById("address");
const shippingEL = document.getElementById("shipping");


const sendbuyersEL = document.getElementById("addbuyers");

let myItems = []; // lagra id´n här


fetch("https://fakestoreapi.com/products")
.then(result => result.json())
.then(data => {
    let categoryButtons = document.getElementsByClassName("categoryButton");
    for (let i = 0; i < categoryButtons.length; i++) {
        categoryButtons[i].addEventListener("click", function() {
            printJson(data, this.getAttribute("data-category"));
        });
    }
    printJson(data, "all");
});


function printJson(data, selectedCategory) {

    //const myArr = Object.keys(data);

    const program = data.filter(program => {
        if (selectedCategory === "all") {
            return true;
        } else if (selectedCategory === program.category) {
            return true;
        }
        return false;
    });
    
   
    programEL.innerHTML = "";
  

    for (let i = 0; i < program.length; i++) { 
        programEL.innerHTML += `<table> 
        <th> <strong> ${program[i].title } </strong> </th>
        <tr> <td> <img src=" ${program[i].image }"width='55%' id="storeImage"></tr> </td>
        <tr> <td> <strong>Price:</strong> ${program[i].price } kr</tr> </td>
        <tr><td> <p><strong>Produktbeskrivning</strong> <br> ${program[i].description}</td> </tr>
        <tr> <td> <strong>Product id: </strong>  ${program[i].id}</td> </tr>
        <tr> <td> <strong>Product Rating: </strong>  ${program[i].rating.rate}</td> </tr> 
        <tr> <td> <strong>Product Count: </strong>  ${program[i].rating.count}</td> </tr> 
        <tr> <td> <strong>Category <br> </strong> ${program[i].category} </td>  </tr> 
        <tr><td> <button  onclick ="addItems('${program[i].id}', '${program[i].title.replace("'","")}', '${program[i].price}')">Add to basket</button> </td></tr> <br><br> </table>`
    }
   
};






function addItems(id, title, price) {
    myItems.push({ id: id, title: title, price: price }); //lägga till items i arrayen
    sessionStorage.setItem("myItems", JSON.stringify(myItems)); //Lagra myItems array i en session storage
    renderCart(myItems); //Rendera den uppdaterade varukorgen
}

function removeItem(index) {
    myItems.splice(index, 1); //Ta bort en produkt från myItems array via index
    sessionStorage.setItem("myItems", JSON.stringify(myItems)); //Lagra dom uppdaterade produkterna i en session storage
    renderCart(myItems); 
}

function renderCart(items) {
    const varukorgenEL = document.getElementById("varukorgen");
    varukorgenEL.innerHTML = ''; 
    varukorgenEL.innerHTML = '<ul id="itemsList"></ul> <p id="total"></p>'; //Lägger till ett nytt UL lista och ett p element för total pris
    const itemsListEL = document.getElementById("itemsList"); 
    for (let i = 0; i < items.length; i++) {//Loopar genom arrayen och lägg till varje produkt till itemslist elementet, och lägger till ta bort knapp
        itemsListEL.innerHTML += `<li> <br><br> <p style="word-wrap: break-word; max-width: 20ch;" id="baskettext"> ${items[i].title} <p id ="priceText"> <strong>Price:  <br> ${items[i].price} kr  </p>
        <button onclick="removeItem(${i})" id="remove">Remove</button> 
         </li>` 
    }
    const totalPrice = items.reduce((acc, item) => acc + parseFloat(item.price), 0); //Räkna ut totalpris för allt
    document.getElementById("total").innerHTML = `Total: ${totalPrice.toFixed(2)} kr &nbsp &nbsp &nbsp    ${myItems.length} <img src="shoppingcart.png" alt="" id="shoppingimg">`; //uppdatera totalpriset och antal items i varukorgen, konstiga tecken för mellanslag
    
}
const savedItems = JSON.parse(sessionStorage.getItem("myItems")); //hämtar items från sessionstorage
if (savedItems) {
    myItems = savedItems;
}
renderCart(myItems);






function addBuyer(event) {
    event.preventDefault();

 

    const name = nameEL.value.trim();
    const email = emailEL.value.trim();
    const address = addressEL.value.trim();
    const shipping = shippingEL.value.trim();

    if(!name || !email || !address || !shipping) {
        console.log("Name, Email, Address or Shipping is missing");
        return;
    }

    const productids = myItems.map(item => {
        return { "stringValue": item.id }
    });

    const data = {
        "fields": {
            "name": {
                "stringValue": name
            },
            "email": {
                "stringValue": email
            },
            "address": {
                "stringValue": address
            },
            "shipping": {
                "stringValue": shipping
            },
            "productids": {
                "arrayValue": {
                    "values": productids
                }
            }

        }
    }

    sessionStorage.removeItem("myItems");

    fetch("https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        location.reload();
    })
    .catch(error => console.log(error));
}









