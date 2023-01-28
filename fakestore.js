"use strict";


let schoolEL = document.getElementById("school");
let programEL = document.getElementById("program");
let varukorgenEL = document.getElementById("showitems");



const nameEL = document.getElementById("buyername");
const emailEL = document.getElementById("email");



const sendbuyersEL = document.getElementById("addbuyers");




console.log(emailEL, nameEL)

fetch("https://fakestoreapi.com/products")
.then(result => result.json())
.then(data => printJson(data));


let myItems = []; // lagra id´n här

function printJson(data) {
  
    const myArr = Object.keys(data);
    const program = data;
    

    for (let i = 0; i < myArr.length; i++) {
        programEL.innerHTML += `<table>
        <th id='th' style="word-wrap: break-word; max-width: 20ch;"> <strong> ${program[i].title } </strong> </th>
        <tr> <td> <img src=" ${program[i].image }"width='15%'></tr> </td>
        <tr> <td> <strong>Price:</strong> ${program[i].price } kr</tr> </td>
        <tr> <p id="mobiletextview"> <strong>Produktbeskrivning</strong> <br> ${program[i].description} </tr> </p>
        <tr> <td> <strong>Product id: </strong>  ${program[i].id} </tr> </td>
        <tr> <td> <strong>Kategori <br> </strong> ${program[i].category}  </tr> </td> 
        <button onclick ="addItems('${program[i].id}', '${program[i].title}', '${program[i].price}')">Add to basket</button>
        <br> <br> <br> </table>`
    }
   
};












function addItems(id, title, price) {
    myItems.push({ id: id, title: title, price: price }); //add an item to the myItems arra 
    sessionStorage.setItem("myItems", JSON.stringify(myItems)); //store myItems array in session storage
    renderCart(myItems); //render the updated cart
}

function removeItem(index) {
    myItems.splice(index, 1); //remove an item from myItems array by its index
    sessionStorage.setItem("myItems", JSON.stringify(myItems)); //store the updated myItems array in session storage
    renderCart(myItems); //render the updated cart
}

function renderCart(items) {
    const varukorgenEL = document.getElementById("varukorgen"); //get the varukorgen element from the HTML
    varukorgenEL.innerHTML = ''; //clear the varukorgen element
    varukorgenEL.innerHTML = '<ul id="itemsList"></ul> <p id="total"></p>'; //add a new unordered list and a p element for the total price
    const itemsListEL = document.getElementById("itemsList"); //get the itemsList element
    for (let i = 0; i < items.length; i++) {
        itemsListEL.innerHTML += `<li> <p style="word-wrap: break-word; max-width: 20ch;" id="baskettext"> ${items[i].title} - <br> <p> <strong>Price:   ${items[i].price} kr  </p> <br>
        <button onclick="removeItem(${i})" id="remove">Remove</button> </li>` //loop through the items array and add each item to the itemsList element, with a remove button
    }
    const totalPrice = items.reduce((acc, item) => acc + parseFloat(item.price), 0); //calculate the total price of all items
    document.getElementById("total").innerHTML = `Total: ${totalPrice.toFixed(2)} kr &nbsp &nbsp &nbsp  ${myItems.length}`; //update the total element with the total price
    
}
const savedItems = JSON.parse(sessionStorage.getItem("myItems")); //get the items from session storage
if (savedItems) {
    myItems = savedItems;
}
renderCart(myItems); //render the cart








function addBuyer() {

    const name = nameEL.value.trim();
    const email = emailEL.value.trim();
    if(!name || !email) {
        console.log("Name or Email is missing");
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
    .then(data => console.log(data))
    .catch(error => console.log(error));
}










sendbuyersEL.addEventListener("click", addBuyer());

// function addBuyer() {

//     const item = JSON.stringify (
//         {
//         "fields": {
//             "name": {
//              "stringValue": "Ashan"
//                  },
//             "email": {
//              "stringValue": "Ash@hotmail.com"
//    }
//   }
//  }
    
// );

//  fetch("https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user",{
//     method: "POST",
//     headers:{ "content-type": "application/JSON"
// },
// body: item
// })
// .then(res => res.json())
// .then(data => console.log(data))
//  }
 











