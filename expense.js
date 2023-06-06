function printExpenseDetail(event) {
  event.preventDefault();
  // Get form input values
  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("select").value;

  // converting userdetail into object
  var userDetail = { amount: amount, description: description, category: category };
  var displayDetail = userDetail.amount + '-' + userDetail.description + '-' + userDetail.category;

  // converting object to string
  let stringUserDetail = JSON.stringify(userDetail);

  axios.post("http://localhost:4000/submit", userDetail)
    .then(() => {
      console.log("POSTED DONE");
      getUserDetailsFromServer();
    })

  // making addevent and remove event 
  var itemList = document.getElementById('items');

  //making new element li
  var li = document.createElement('li');
  // Add class
  li.className = 'list-group-item';
  li.style.float = 'left';
  // Add text node with input value
  li.appendChild(document.createTextNode(displayDetail));

  // Create del button element
  var deleteBtn = document.createElement('button');
  var editBtn = document.createElement('button');

  // Add classes to del button
  deleteBtn.className = 'btn btn-danger float-right btn-sm delete';
  editBtn.className = 'btn btn-primary float-right btn-sm edit';

  deleteBtn.style.float = 'right';
  editBtn.style.float = 'right';
  editBtn.style.marginRight = '5px';
  editBtn.style.marginLeft = '5px';

  // Append text node
  deleteBtn.appendChild(document.createTextNode('Delete'));
  editBtn.appendChild(document.createTextNode('Edit'));

  deleteBtn.onclick = (event) => {
    event.preventDefault();
    deleteFromServer(uniqId);
    itemList.removeChild(li);
  }
  editBtn.onclick = (event) => {
    event.preventDefault();
    deleteFromServer(uniqId);
    itemList.removeChild(li);
    document.getElementById("amount").value = userDetail.amount;
    document.getElementById("description").value = userDetail.description;
    document.getElementById("select").value = userDetail.category;
  }


  // Append button to li
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);



  // Append li to list
  itemList.appendChild(li);
  document.getElementById("amount").value = "";
  document.getElementById("description").value = "";
  document.getElementById("select").value = "";
}

function deleteFromServer(uniqId) {
  axios.delete(`http://localhost:4000/${uniqId}`)
    .then(() => {
      getUserDetailsFromServer();
    })
}

function getUserDetailsFromServer() {
  axios.get("http://localhost:4000/")
    .then((res) => {
      var itemList = document.getElementById('items');
      itemList.innerHTML = ""; // Clear the current list
      for (let i = 0; i < res.data.length; i++) {
        const userDetail = res.data[i];
        uniqId = res.data[i]['id'];
        var displayDetail = userDetail.amount + '-' + userDetail.description + '-' + userDetail.category;

        var li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(displayDetail));

        var deleteBtn = document.createElement('button');
        var editBtn = document.createElement('button');

        deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
        editBtn.className = 'btn btn-primary btn-sm float-right edit';

        deleteBtn.style.float = 'right';
        editBtn.style.float = 'right';
        editBtn.style.marginRight = '5px';
        editBtn.style.marginLeft = '5px';

        deleteBtn.appendChild(document.createTextNode('Delete'));
        editBtn.appendChild(document.createTextNode('Edit'));

        function deleteList(li, uniqId) {
          deleteBtn.onclick = (event) => {
            event.preventDefault();
            deleteFromServer(uniqId);
            itemList.removeChild(li);
          }
        }
        deleteList(li, uniqId);
        editBtn.onclick = (event) => {
          event.preventDefault();
          deleteFromServer(uniqId);
          itemList.removeChild(li);
          // filling all value in input field to edit
          document.getElementById("amount").value = userDetail.amount;
          document.getElementById("description").value = userDetail.description;
          document.getElementById("select").value = userDetail.category;
        }


        li.appendChild(deleteBtn);
        li.appendChild(editBtn);

        itemList.appendChild(li);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Call getUserDetailsFromServer() when the page is loaded
window.addEventListener("DOMContentLoaded", getUserDetailsFromServer);