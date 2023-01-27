"use strict";


let schoolEL = document.getElementById("school");
let programEL = document.getElementById("program");
let varukorgenEL = document.getElementById("showitems");



fetch("https://fakestoreapi.com/products")
.then(result => result.json())
.then(data => printJson(data));





/*
1. SKAPA ID FÖR ALLA TR
1. TA IN ALL IN´d, lagra manuellt.
*/


const myItems = []; // lagra id´n här

function printJson(data) {
  
    const myArr = Object.keys(data);
    const program = data;
    

    for (let i = 0; i < myArr.length; i++) {
        programEL.innerHTML += `<table>
        <th id='th' style="word-wrap: break-word; max-width: 30ch;"> <strong> ${program[i].title } </strong> </th>
        <tr> <td> <img src=" ${program[i].image }"width='15%'></tr> </td>
        <tr> <td> <strong>Price:</strong> ${program[i].price } kr</tr> </td>
        <tr> <p style="word-wrap: break-word; max-width: 40ch;"> <strong>Produktbeskrivning</strong> <br> ${program[i].description} </tr> </p>
        <tr> <td> <strong>Product id: </strong>  ${program[i].id} </tr> </td>
        <tr> <td> <strong>Kategori </strong>: ${program[i].category}  </tr> </td> 
        <button onclick ="addItems('${program[i].id}', '${program[i].title}', '${program[i].price}')">Lägg till i varukorgen </button>
        <br> <br> <br> </table>`
    }
   
};


//const thEL = document.getElementById("th"); //gör lokala variablar för samtliga lines

function addItems(id,title,price) {
    myItems.push({ id: id, title: title, price: price });
    console.log(myItems);

    const varukorgenEL = document.getElementById("varukorgen");
    varukorgenEL.innerHTML = '';
    varukorgenEL.innerHTML = '<ul id="itemsList"></ul> <p id="total"></p>';
    const itemsListEL = document.getElementById("itemsList");
    for (let i = 0; i < myItems.length; i++) {
        itemsListEL.innerHTML += `<li> <p style="word-wrap: break-word; max-width: 20ch;" id="baskettext"> ${myItems[i].title} - <br> <p> <strong>Price:   ${myItems[i].price} kr </p> <br></li>`
    }

    // calculate total price
    const totalPrice = myItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
    document.getElementById("total").innerHTML = `Total: ${totalPrice} kr`;
}



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
 











