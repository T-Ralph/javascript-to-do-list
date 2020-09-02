//Get The Needed HTML Tags
const todoForm = document.querySelector("section:nth-of-type(1) > form");
const pendingList = document.querySelector("section:nth-of-type(2) > ul");
const activeList = document.querySelector("section:nth-of-type(3) > form > ul");
const completedList = document.querySelector("section:nth-of-type(4) > ul");

//Add Event Listener to ToDo Form
todoForm.addEventListener("submit", addTodo);

//Declare Functions
function addTodo(event) {
    event.preventDefault(); //Prevent Form Refresh

    //Create li Tag
    const todoLi = document.createElement("li");
    todoLi.textContent = ` ${todoForm.todo.value}`;

    //Create small Tag
    const smallTag = document.createElement("small");
    smallTag.textContent = `${getTodoDate()}`;

    //Create span Tag
    const spanTag = document.createElement("span");
    spanTag.textContent = "Creation Time: ";
    smallTag.prepend(spanTag);

    todoLi.appendChild(smallTag); //Add small Tag To li Tag

    //Create button Tag
    const todoButtonStart = document.createElement("button");
    todoButtonStart.title = "Start To-Do";
    todoButtonStart.textContent = "Start";
    todoButtonStart.addEventListener("click", startTodo);

    //Create button Tag
    const todoButtonEdit = document.createElement("button");
    todoButtonEdit.title = "Edit To-Do";
    todoButtonEdit.textContent = "Edit";
    todoButtonEdit.addEventListener("click", editTodo);

    //Create button Tag
    const todoButtonDelete = document.createElement("button");
    todoButtonDelete.title = "Delete To-Do";
    todoButtonDelete.textContent = "Delete";
    todoButtonDelete.addEventListener("click", deleteTodo);

    todoLi.appendChild(todoButtonStart); //Add button To li
    todoLi.appendChild(todoButtonEdit); //Add button To li
    todoLi.appendChild(todoButtonDelete); //Add button To li
    pendingList.appendChild(todoLi); //Add li To Pending Todo
    todoForm.reset(); //Reset ToDo Form
}

function getTodoDate() {
    const now = new Date();
    return `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
}

function startTodo(event) {
    event.preventDefault(); //Prevent Form Refresh

    //Create li Tag
    const todoLi = document.createElement("li");
    todoLi.textContent = ` ${this.parentElement.firstChild.nodeValue}`;

    //Create small Tag
    const smallTagCreationTime = document.createElement("small");
    smallTagCreationTime.textContent = `${this.parentElement.querySelector("small").firstChild.nextSibling.nodeValue}`;

    //Create span Tag
    const spanTagCreationTime = document.createElement("span");
    spanTagCreationTime.textContent = "Creation Time: ";
    smallTagCreationTime.prepend(spanTagCreationTime);

    todoLi.appendChild(smallTagCreationTime); //Add small Tag To li Tag

    //Check for Last Edited Time
    if (this.parentElement.querySelector("small:nth-of-type(2)")) {
        //Create small Tag
        const smallTagLastEditedTime = document.createElement("small");
        smallTagLastEditedTime.textContent = `${this.parentElement.querySelector("small:nth-of-type(2)").firstChild.nextSibling.nodeValue}`;

        //Create span Tag
        const spanTagLastEditedTime = document.createElement("span");
        spanTagLastEditedTime.textContent = "Last Edited Time: ";
        smallTagLastEditedTime.prepend(spanTagLastEditedTime);

        todoLi.appendChild(smallTagLastEditedTime); //Add small Tag To li Tag
    }

    //Create small Tag
    const smallTagStartTime = document.createElement("small");
    smallTagStartTime.textContent = `${getTodoDate()}`;

    //Create span Tag
    const spanTagStartTime = document.createElement("span");
    spanTagStartTime.textContent = "Start Time: ";
    smallTagStartTime.prepend(spanTagStartTime);

    todoLi.appendChild(smallTagStartTime); //Add small Tag To li Tag

    //Create input checkbox Tag
    const todoCheckbox = document.createElement("input");
    todoCheckbox.type = "checkbox";
    todoCheckbox.addEventListener("click", completeTodo);

    //Create button Tag
    const todoButtonDelete = document.createElement("button");
    todoButtonDelete.title = "Delete To-Do";
    todoButtonDelete.textContent = "Delete";
    todoButtonDelete.addEventListener("click", deleteTodo);

    todoLi.prepend(todoCheckbox); //Add input checkbox To li
    todoLi.appendChild(todoButtonDelete); //Add button To li
    activeList.appendChild(todoLi); //Add li To Active Todo
    this.parentElement.remove(); //Remove li from Pending Todo
}

function deleteTodo(event) {
    event.preventDefault(); //Prevent Form Refresh
    this.parentElement.remove(); //Remove li Node
}

function editTodo(event) {
    event.preventDefault(); //Prevent Form Refresh
    this.parentElement.contentEditable = true; //Set Todo to contentEditable

    //Set Event Listener for Last Edited Time
    this.parentElement.addEventListener("input", () => {
        //Create small Tag
        const smallTag = document.createElement("small");
        smallTag.textContent = `${getTodoDate()}`;

        //Create span Tag
        const spanTag = document.createElement("span");
        spanTag.textContent = "Last Edited Time: ";
        smallTag.prepend(spanTag);

        //Check for Last Edited Time
        if (this.parentElement.querySelector("small:nth-of-type(2)")) {
            this.parentElement.replaceChild(smallTag, this.parentElement.querySelector("small:nth-of-type(2)")); //Add small Tag Before button Tag
        }
        else {
            this.parentNode.insertBefore(smallTag, this.parentElement.querySelector("button:nth-of-type(1)")); //Add small Tag Before button Tag
        }
    });
}

function completeTodo(event) {
    event.preventDefault(); //Prevent Form Refresh

    //Create small Tag
    const smallTag = document.createElement("small");
    smallTag.textContent = `${getTodoDate()}`;

    //Create span Tag
    const spanTag = document.createElement("span");
    spanTag.textContent = "End Time: ";
    smallTag.prepend(spanTag);

    this.parentNode.insertBefore(smallTag, this.parentElement.querySelector("button")); //Add small Tag Before button Tag
    completedList.appendChild(this.parentElement); //Add li Tag to Completed Todo
    this.remove(); //Remove input checkbox
}