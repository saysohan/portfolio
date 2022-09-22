const groceryForm = document.querySelector(".groceryForm");
const input = document.querySelector(".groceryInput");
const groceryList = document.querySelector(".groceryList");

let groceries = [];

groceryForm.addEventListener("submit", function (event) {
  event.preventDefault;
  addGrocery(input.value);
});

function addGrocery(item) {
  if (item !== "") {
    const grocery = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    groceries.push(grocery);
    addLocalStorage(groceries);

    input.value = "";
  }
}

function renderGrocery(groceries) {
  groceryList.innerHTML = "";

  groceries.forEach(function (item) {
    const check = item.completed ? "check" : null;

    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);

    if (item.completed === true) {
      li.classList.add("check");
    }

    li.innerHTML = `<input type="checkbox" class="checkbox" ${check}>${item.name} <button class="delete-button btn btn-danger" style="--bs-btn-padding-y: .15rem; --bs-btn-padding-x: .3rem; --bs-btn-font-size: .55rem;">X</button>`;

    groceryList.append(li);
  });
}

function addLocalStorage(groceries) {
  localStorage.setItem("groceries", JSON.stringify(groceries));
  renderGrocery(groceries);
}

function getLocalStorage() {
  const reference = localStorage.getItem("groceries");

  if (reference) {
    groceries = JSON.parse(reference);
    renderGrocery(groceries);
  }
}

function toggle(id) {
  groceries.forEach(function (item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addLocalStorage(groceries);
}

function deleteGrocery(id) {
  groceries = groceries.filter(function (item) {
    return item.id != id;
  });

  addLocalStorage(groceries);
}

getLocalStorage();

groceryList.addEventListener("click", function (event) {
  if (event.target.type === "checkbox") {
    toggle(event.target.parentElement.getAttribute("data-key"));
  }

  if (event.target.classList.contains("delete-button")) {
    deleteGrocery(event.target.parentElement.getAttribute("data-key"));
  }
});
