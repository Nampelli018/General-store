document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("myForm");
  const itemNameInput = document.getElementById("description");
  const descriptionInput = document.getElementById("description1");
  const priceInput = document.getElementById("amount");
  const quantityInput = document.getElementById("quantity");
  const submitButton = document.getElementById("submit");
  const tableBody = document.getElementById("tableBody");
  let editIndex = -1; // Track the index for editing

  submitButton.addEventListener("click", function () {
    const itemName = itemNameInput.value;
    const description = descriptionInput.value;
    const price = priceInput.value;
    const quantity = quantityInput.value;

    if (itemName && price && quantity && description) {
      const rowData = {
        itemName,
        description,
        price,
        quantity,
      };

      if (editIndex !== -1) {
        editInCrudCrudAPI(rowData, editIndex);
        editIndex = -1; // Reset the edit index
        submitButton.textContent = "Add Item";
      } else {
        addToCrudCrudAPI(rowData);
      }

      updateTable();
      clearFormInputs();
    } else {
      alert("Please fill in all fields.");
    }
  });

  function addToCrudCrudAPI(data) {
    fetch("https://crudcrud.com/api/b47de58ba57a44d897ef8a9ca56404c9/g-store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the API response here if needed
        console.log("Item added:", responseData);
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  }

  function editInCrudCrudAPI(data, index) {
    fetch(
      `https://crudcrud.com/api/b47de58ba57a44d897ef8a9ca56404c9/g-store/${index}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the API response here if needed
        console.log("Item updated:", responseData);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
  }

  function updateTable() {
    fetch("https://crudcrud.com/api/b47de58ba57a44d897ef8a9ca56404c9/g-store")
      .then((response) => response.json())
      .then((data) => {
        let tableHTML = "";
        data.forEach(function (item, index) {
          tableHTML += "<tr>";
          tableHTML += `<td>${item.itemName}</td>`;
          tableHTML += `<td>${item.description}</td>`;
          tableHTML += `<td>${item.price}</td>`;
          tableHTML += `<td>${item.quantity}</td>`;
          tableHTML += `<td><button class="edit btn btn-success" data-index="${item._id}">Edit Item</button></td>`;
          tableHTML += `<td><button class="delete btn btn-danger" data-index="${item._id}">Delete Item</button></td></tr>`;
        });
        tableBody.innerHTML = tableHTML;
        setEditDeleteListeners();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }

  function setEditDeleteListeners() {
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const index = button.getAttribute("data-index");
        editIndex = index; // Set the edit index
        populateFormWithOldData(index);
        submitButton.textContent = "Edit";
      });
    });

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const index = button.getAttribute("data-index");
        deleteFromCrudCrudAPI(index);
      });
    });
  }

  function deleteFromCrudCrudAPI(index) {
    fetch(
      `https://crudcrud.com/api/b47de58ba57a44d897ef8a9ca56404c9/g-store/${index}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (response.ok) {
          console.log("Item deleted.");
          updateTable();
        } else {
          console.error("Error deleting item.");
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  function populateFormWithOldData(index) {
    fetch(
      `https://crudcrud.com/api/b47de58ba57a44d897ef8a9ca56404c9/g-store/${index}`
    )
      .then((response) => response.json())
      .then((data) => {
        itemNameInput.value = data.itemName;
        itemdescriptionInput.value = dta.description;
        priceInput.value = data.price;
        quantityInput.value = data.quantity;
      })
      .catch((error) => {
        console.error("Error fetching item data:", error);
      });
  }

  function clearFormInputs() {
    itemNameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
    quantityInput.value = "";
  }

  updateTable();
});
