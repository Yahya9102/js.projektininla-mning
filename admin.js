const programEL = document.getElementById("program");
const editModalEL = document.getElementById("editModal");
const editNameEL = document.getElementById("editName");
const editEmailEL = document.getElementById("editEmail");
const editProductIdsEL = document.getElementById("editProductIds");
const closeEditModalEL = document.getElementById("closeEditModal");
const submitEditOrderEL = document.getElementById("submitEditOrder");


// Fetch all orders from Firestore
fetch("https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user")
  .then(result => result.json())
  .then(data => printOrders(data));
  


// Print all orders to the table
function printOrders(data) {
   
    const userIds = data.documents.map(document => document.name.split("/").pop());
    console.log(userIds)

    for (let i = 0; i < data.documents.length; i++) {
      const order = data.documents[i];
      const name = order.fields.name.stringValue;
      const shipping = order.fields.shipping && order.fields.shipping.stringValue;
      const address = order.fields.address && order.fields.address.stringValue;
      const email = order.fields.email.stringValue;
      const productIds = order.fields.productids.arrayValue.values
        .map(value => value.stringValue)
        .join(", ");
  
      programEL.innerHTML += `
        <tr><td><p> <strong> Name: </strong> ${name} </p></td></tr>
        <tr><td><p> <strong> Email: </strong>  ${email} </p></td></tr>
        <tr><td><p> <strong> Address: </strong>  ${address} </p></td></tr>
        <tr><td><p> <strong> Shipping: </strong>  ${shipping} </p></td></tr>
        <tr><td><p> <strong> Product IDs: </strong> ${productIds}</p></td> </tr>
        <tr><td><p> <strong> Order IDs: </strong> ${userIds[i]}</p></td> </tr>
        <tr><td><button id="editOrder" onclick="editOrder('${userIds[i]}', '${name}', '${email}', '${productIds}', '${address}')">Edit</button></td></tr>
        <tr><td><button onclick="removeOrder('${userIds[i]}')">Remove</button></td></tr> <br> <br>`;
    }
  }
  





 



  const nameInput = document.getElementById("editName");
  const emailInput = document.getElementById("editEmail");
  const productIdsInput = document.getElementById("editProductIds");
  const addressInput = document.getElementById("address");
  const userIdInput = document.getElementById("userId");
  const submitBtn = document.getElementById("submitEditOrder");
  const form = document.getElementById("editModal");
  const shippingEL = document.getElementById("editShipping");

  
  let userId;
 


  function editOrder(userId, name, email, productIds, address, shipping) {

    const nameInput = document.getElementById("editName");
    const emailInput = document.getElementById("editEmail");
    const productIdsInput = document.getElementById("editProductIds");
    const addressInput = document.getElementById("address");
    const shippingInput = document.getElementById("editShipping");
    const userIdInput = document.getElementById("userId");
    const submitBtn = document.getElementById("submitEditOrder");
    const form = document.getElementById("editModal");
  
    nameInput.value = name;
    emailInput.value = email;
    productIdsInput.value = productIds;
    addressInput.value = address;
    shippingInput.value = shipping;
    userIdInput.value = userId;
  
    submitBtn.addEventListener("click", function() {

        

      const updatedUserId = userIdInput.value;  
      const updatedName = nameInput.value;
      const updatedEmail = emailInput.value;
      const updatedAddress = addressInput.value;
      const updatedShipping = shippingInput.value;
      const updatedProductIds = productIdsInput.value;
  
      fetch(`https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user/${updatedUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "fields": {
            "name": { "stringValue": updatedName },
            "email": { "stringValue": updatedEmail },
            "address": { "stringValue": updatedAddress },
            "shipping": { "stringValue": updatedShipping },
            "productids": { "arrayValue": { "values": updatedProductIds.split(",").map(id => ({ "stringValue": id.trim() })) } }
          }
        })
      })
      .then(response => response.json())
      .then(() => {
        // Refresh the orders table
        programEL.innerHTML = "";
        fetch("https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user")
        .then(result => result.json())
        .then(data => printOrders(data));
      });
    });
  
    form.style.display = "block";
  };
  
// Submit edited order




function submitEditOrder() {
    console.log("hello")

    const updatedUserId = userIdInput.value;  
    const name = editNameEL.value;
    const email = editEmailEL.value;
    const productIds = editProductIdsEL.value;
    const shippingOption = shippingEL.value;
    const address = addressInput.value;
    
  
  
    fetch(`https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user/${updatedUserId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        fields: {
          name: { stringValue: name },
          email: { stringValue: email },
          productids: {
            arrayValue: {
              values: productIds.split(',').map(id => ({ stringValue: id.trim() }))
            }
          },
          shipping: { stringValue: shippingOption },
          address: { stringValue: address }
        }
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Close the edit modal
        closeEditModal();
        // Refresh the order list
       
      })
      .catch(error => {
        console.error(error);
      });
  }


 // Close the edit modal
function closeEditModal() {
editModalEL.style.display = "none";
}

// Remove an order
function removeOrder(userIds) {
    if (confirm("Are you sure you want to remove this order?")) {
      fetch(`https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user/${userIds}`, {
        method: 'DELETE'
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Refresh the order list
        fetchOrders();
      })
      .catch(error => {
        console.error(error);
      });
    }
  }
  
  // Close the edit modal
  function closeEditModal() {
    editModalEL.style.display = "none";
  }
  
  // Refresh the order list
function fetchOrders() {
    programEL.innerHTML = "";

    fetch("https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user")
      .then(result => result.json())
      .then(data => {
        // Remove previous orders before printing new orders
        programEL.innerHTML = "";
        printOrders(data);
      });
  }





submitEditOrderEL.addEventListener("click",submitEditOrder)










// const programEL = document.getElementById("program");
// const editModalEL = document.getElementById("editModal");
// const editNameEL = document.getElementById("editName");
// const editEmailEL = document.getElementById("editEmail");
// const editProductIdsEL = document.getElementById("editProductIds");

// // Fetch all orders from Firestore
// fetch("https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user")
//   .then(result => result.json())
//   .then(data => printOrders(data));
  


// // Print all orders to the table
// function printOrders(data) {
//     const userIds = data.documents.map(document => document.name.split("/").pop());
  
//     for (let i = 0; i < data.documents.length; i++) {
//       const order = data.documents[i];
//       const name = order.fields.name.stringValue;
//       const email = order.fields.email.stringValue;
//       const productIds = order.fields.productids.arrayValue.values
//         .map(value => value.stringValue)
//         .join(", ");
  
//       programEL.innerHTML += `
//         <tr><td><p> <strong> Name: </strong> ${name} </p></td></tr>
//         <tr><td><p> <strong> Email: </strong>  ${email} </p></td></tr>
//         <tr><td><p> <strong> Product IDs: </strong> ${productIds}</p></td> </tr>
//         <tr><td><p> <strong> Order IDs: </strong> ${userIds[i]}</p></td> </tr>
//         <tr><td><button onclick="editOrder('${userIds}', '${name}', '${email}', '${productIds}')">Edit</button></td></tr>
//         <tr><td><button onclick="removeOrder('${userIds}')">Remove</button></td></tr> <br> <br>`;
//     }
//   }
  


// // Open edit modal for an order
// function editOrder(userIds, name, email, productIds) {
//   editNameEL.value = name;
//   editEmailEL.value = email;
//   editProductIdsEL.value = productIds;

//   editModalEL.style.display = "block";

//   const closeEL = document.getElementsByClassName("close")[0];
//   closeEL.onclick = function() {
//     editModalEL.style.display = "none";
//   };
// }

// // Submit edited order
// function submitEditOrder() {
//     const orderName = editModalEL.dataset.orderName;
//     const name = editNameEL.value;
//     const email = editEmailEL.value;
//     const productId = editProductIdsEL.value;
    
//     fetch(`https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user/${userIds}`, {
//       method: 'PATCH',
//       body: JSON.stringify({
//         name: name,
//         email: email,
//         productId: productId
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       // Close the edit modal
//       closeEditModal();
//       // Refresh the order list
//       fetchOrders();
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   }
  
//   function deleteOrder(orderName) {
//     fetch(`https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user/${orderName}`, {
//       method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       // Refresh the order list
//       fetchOrders();
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   }
  