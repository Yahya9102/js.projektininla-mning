 "use strict;"


// const programEL = document.getElementById("program");




// fetch("https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user")
// .then(result => result.json())
// .then(data => printJson(data));



// let myItems = []; // lagra id´n här

// function printJson(data) {
  

//     console.log(data)
//     const program = data.documents;
    
   
//     for (let i = 0; i < program.length; i++) {
//         programEL.innerHTML += `<table>
//         <th id='th' style="word-wrap: break-word; max-width: 20ch;"> <strong> ${program[i].name } </strong> </th>
//         <tr> <td>  ${program[i].fields.productids } </td></tr>
//         <tr> ${program[i].fields.email} </tr> </p>
//         <br> <br> <br> </table>`
//     }
   
// };


// const programEL = document.getElementById("program");

// fetch("https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user")
//   .then(result => result.json())
//   .then(data => {
//     const documents = data.documents;
//     let html = "";

//     for (let i = 0; i < documents.length; i++) {
//       const fields = documents[i].fields;
//       const email = fields.email.stringValue;
//       const name = fields.name.stringValue;
      
//       html += `
//         <table>
//           <th id='th' style="word-wrap: break-word; max-width: 20ch;">
//             <strong>${name}</strong>
//           </th>
//           <tr>
//             <td>
//               <strong>Email:</strong> ${email}
//             </td>
//           </tr>
//         </table>
//         <br><br><br>
//       `;
//     }

//     programEL.innerHTML = html;
//   });


const programEL = document.getElementById("program");
const editFormEL = document.getElementById("editForm");

fetch("https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/user")
  .then(result => result.json())
  .then(data => printJson(data));

let selectedDocument = "";

function printJson(data) {
  const documents = data.documents;
  
  for (let i = 0; i < documents.length; i++) {
    programEL.innerHTML += `
      <table>
        <th id='th' style="word-wrap: break-word; max-width: 20ch;"> 
          <strong> ${documents[i].fields.name.stringValue} </strong> 
        </th>
        <tr> 
          <td> 
            <strong>Email:</strong> ${documents[i].fields.email.stringValue} 
          </td>
        </tr>
        <tr> 
          <td> 
            <strong>Product IDs:</strong> 
            ${documents[i].fields.productids.arrayValue.values
              .map(value => value.stringValue)
              .join(", ")}
          </td>
        </tr>
        <button onclick="editOrder('${documents[i].name}')">Edit</button>
        <button onclick="removeOrder('${documents[i].name}')">Remove</button>
      </table>
      <br> <br>
    `;
  }
}

function editOrder(documentName) {
  selectedDocument = documentName;
  editFormEL.style.display = "block";
}

function removeOrder(documentName) {
  if (confirm("Are you sure you want to remove this order?")) {
    fetch(`https://firestore.googleapis.com/v1/projects/js-project-e8eb4/databases/(default)/documents/${documentName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => location.reload())
      .catch(error => console.error(error));
  }
}

function submitEdit() {
  const editNameEL = document.getElementById
}