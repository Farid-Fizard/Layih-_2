const box = document.querySelector(".box");
const button = document.querySelector("button");
const icon = document.querySelector(".sorter");
const form = document.querySelector("form");
let switcher = true;
let descDetector = true;

//ilk inputa dəyər mənimsədir...
const firstInput = document.querySelector("#first");
firstInput.addEventListener("blur", _ => {
    firstInput.setAttribute("value", firstInput.value);
});

//eventListenerleri çağıran funksiya...
eventListeners();

function eventListeners() {

    // yeni boxes divi yaradır və yeni inputlara dəyər mənimsədir...
    form.addEventListener("submit", creator);
    // yaradılan boxes divini və onun elementlərini silir...
    box.addEventListener("click", deleteInput);
    // listin aşağıdan yuxarı və əksinə sıralanması
    icon.addEventListener("click", (el) => {
        if (switcher) {
            el.target.src = "images/a-z.svg";
            switcher = false;
            ascendingList();
            let todoList = document.getElementsByName("newTodo");
            todoList.forEach(changer);
        } else {
            el.target.src = "images/z-a.svg";
            switcher = true;
            descendingList();
            let todoList = document.getElementsByName("newTodo");
            todoList.forEach(changer);
        }
    });
}

function creator(event) {
    box.innerHTML += `<div class="boxes">
    <input type="text" name="newTodo"  />
    <img class="close" src="Images/close.svg" alt="" />
  </div>`;
    let todoList = document.getElementsByName("newTodo");
    todoList.forEach(changer);
    event.preventDefault();
}

function changer(el) {
    el.addEventListener("keyup", (_) => {
        el.setAttribute("value", el.value);
    });
}

function deleteInput(e) {
    if (e.target.className == "close") {
        e.target.parentElement.remove();
    }
    e.preventDefault();
}

function ascendingList() {
    unsorted = [];
    TodoList = document.querySelectorAll("input");
    let detector = true;
    TodoList.forEach((element) => {
        unsorted.push(element.value.trim());
        // bütün elementlər rəqəm olarsa rəqəmlərə nəzərən nizamlama
        if (isNaN(element.value.trim()) == true) {
            detector = false;
        }
    });
    if (detector)
        unsorted.sort(function(a, b) { return a - b });
    else
        unsorted.sort();
    descDetector = false;
    // artan nizamlanmış listi inputlara mənimsətmə ...
    let i = 0;
    box.innerHTML = ""
    unsorted.forEach(item => {
        box.innerHTML += `<div class="boxes">
      <input type="text" name="newTodo" value="${item}" />
      <img class="close" src="Images/close.svg" alt="" />
    </div>`;
    })

}

function descendingList() {
    unsorted = [];
    TodoList = document.querySelectorAll("input");
    let detector = true;
    TodoList.forEach((element) => {
        unsorted.push(element.value.trim());
    });
    if (descDetector)
        unsorted.sort(function(a, b) { return b - a });
    else
        unsorted.reverse();
    box.innerHTML = ""
    unsorted.forEach(item => {
        box.innerHTML += `<div class="boxes">
      <input type="text" name="newTodo" value="${item}" />
      <img class="close" src="Images/close.svg" alt="" />
    </div>`;
    })
}