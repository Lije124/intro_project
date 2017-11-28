function task(date, time, details) {
    this.date = date;
    this.time = time;
    this.details = details;
}

var taskList = [];

// This function is necessary in order to display the existing notes from local storage when loading the page, but only if there are any. 

function preDisplay() {
    let existingTasks = JSON.parse(localStorage.getItem("taskList"));
    if (existingTasks.length > 0) {
        taskList = existingTasks;
        displayTasks();
    }
}

window.onload = preDisplay;

var addTask = document.getElementById("newTask");
var addButton = addTask.addEventListener("click", getTask);

// This function retrieves the new input properties, adds a new element to the array in local storage, clears the input fields, and calls the display function. It prevents execution if you haven't entered all of the values.

function getTask() {

    let taskDate = document.getElementById("date").value;
    if (!taskDate) {
        let message = "Please enter the date!";
        addAlert(message);
        return;
    }
    let taskTime = document.getElementById("time").value;
    if (!taskTime) {
        let message = "Please enter the time!";
        addAlert(message);
        return;
    }
    let taskDetails = document.getElementById("details").value;
    if (!taskDetails) {
        let message = "Please enter the task details!";
        addAlert(message);
        return;
    }

    let listItem = new task(taskDate, taskTime, taskDetails);
    taskList.push(listItem);

    for (let i = 0; i < taskList.length; i++) {
        taskList[i].id = i;
    }

    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayTask(listItem);
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("details").value = "";
}

// This function displays the new note without reloading all the existing ones. It calls the button functions, which append the necessary behaviors to the delete and edit buttons.

function displayTask(task) {

    let itemIndex = task.id;

    let itemDiv = document.createElement("div");
    itemDiv.id = "tn" + itemIndex;
    itemDiv.className = "taskNote fade-in";
    let noteAdd = document.getElementById("tasks").appendChild(itemDiv);

    let textDiv = document.createElement("div");
    textDiv.className = "taskText";
    textDiv.innerHTML = task.details;
    let textAdd = document.getElementById(itemDiv.id).appendChild(textDiv);

    let timeDiv = document.createElement("div");
    timeDiv.className = "dateTime";
    timeDiv.innerHTML = task.date + "<br />" + task.time;
    let timeAdd = document.getElementById(itemDiv.id).appendChild(timeDiv);

    let iconDiv = document.createElement("div");
    iconDiv.id = "di" + itemIndex;
    iconDiv.className = "del";
    let iconDivAdd = document.getElementById(itemDiv.id).appendChild(iconDiv);

    let delButton = document.createElement("button");
    delButton.className = "delInv glyphicon glyphicon-trash";
    let delButtonAdd = document.getElementById(iconDiv.id).appendChild(delButton);

    let spaceAdd = document.getElementById(iconDiv.id).innerHTML += "&nbsp;&nbsp;";

    let editButton = document.createElement("button");
    editButton.className = "edInv glyphicon glyphicon-pencil";
    let editButtonAdd = document.getElementById(iconDiv.id).appendChild(editButton);

    deleteButtons();
    editButtons();

}

// This function displays all of the existing array elements in local storage when the page is loaded and after the button functions are invoked. It calls the buttons function, which appends the necessary behaviors to the delete and edit buttons. It was necessary to clear the page first, because without this I was seeing overlapping elements when the function was called. 

function displayTasks() {

    document.getElementById("tasks").innerHTML = "";

    for (let i = 0; i < taskList.length; i++) {
        let itemDiv = document.createElement("div");
        itemDiv.id = "tn" + i;
        itemDiv.className = "taskNote fade-in";
        let noteAdd = document.getElementById("tasks").appendChild(itemDiv);

        let textDiv = document.createElement("div");
        textDiv.className = "taskText";
        textDiv.innerHTML = taskList[i].details;
        let textAdd = document.getElementById(itemDiv.id).appendChild(textDiv);

        let timeDiv = document.createElement("div");
        timeDiv.className = "dateTime";
        timeDiv.innerHTML = taskList[i].date + "<br />" + taskList[i].time;
        let timeAdd = document.getElementById(itemDiv.id).appendChild(timeDiv);

        let iconDiv = document.createElement("div");
        iconDiv.id = "di" + i;
        iconDiv.className = "del";
        let iconDivAdd = document.getElementById(itemDiv.id).appendChild(iconDiv);

        let delButton = document.createElement("button");
        delButton.className = "delInv glyphicon glyphicon-trash";
        let delButtonAdd = document.getElementById(iconDiv.id).appendChild(delButton);

        let spaceAdd = document.getElementById(iconDiv.id).innerHTML += "&nbsp;&nbsp;";

        let editButton = document.createElement("button");
        editButton.className = "edInv glyphicon glyphicon-pencil";
        let editButtonAdd = document.getElementById(iconDiv.id).appendChild(editButton);

    }

    deleteButtons();
    editButtons();

}

/*  This function calls the existing array elements and adds a delete function to the trash icon:  */

function deleteButtons() {
    let delButtons = document.getElementsByClassName("delInv");

    /* The anonymous delete function was supposed to fade out the note from which it is called, which left an empty space on the page. So I added the (commented out) removeChild code to delete the item from the HTML. This removed the space, however when I created a new task, it's innerHTML overlapped with the previous one, as if it were filling the space of the deleted item. The easiest thing to do would be to call the general display function, which would reinitialize the array and display the remaining elements. However calling the general display function causes all the items to reload, which negated the fade out. I tried a few ways of reinitializing the array without reloading the page, but even though I succeeded in assigning new ids to the remaining elements, this problem persisted. In the end I decided that this was way too much effort for a fade out effect with no fuctional necessity, so I invoked the display function. */

    for (let i = 0; i < delButtons.length; i++) {
        delButtons[i].onclick = function () {
            let boxDiv = this.parentElement;
            let taskDiv = boxDiv.parentElement;
            taskDiv.className = "taskNote fade-out";
            let taskId = taskDiv.id;
            let taskIndex = taskId.charAt(taskId.length - 1);
            taskList.splice(taskIndex, 1);
            localStorage.setItem("taskList", JSON.stringify(taskList));
 //         taskDiv.parentNode.removeChild(taskDiv);
            displayTasks();
        }
    }
}

// This function calls the existing array elements and adds an edit function to the pencil icon. This function opens a text area over the note, in which to enter new task details. Because I did not want to create a new button for updating the task with the new details, I added a sub-function that changes the onclick function of the pencil icon. 

function editButtons() {
    let editButtons = document.getElementsByClassName("edInv");
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].onclick = function () {
            let boxDiv = this.parentElement;
            let taskDiv = boxDiv.parentElement;
            let taskId = taskDiv.id;
            let taskIndex = taskId.charAt(taskId.length - 1);
            let editDiv = document.createElement("textarea");
            editDiv.className = "editTask";
            editDiv.placeholder = "Edit details and reclick the icon";
            let editDivAdd = document.getElementById(taskDiv.id).appendChild(editDiv);
            this.onclick = function () {
                taskList[taskIndex].details = editDiv.value;
                localStorage.setItem("taskList", JSON.stringify(taskList));
                displayTasks();
            }
        }
    }
}

// This function creates an alert message, because you told us not to use the default alert function...

function addAlert(message) {
    let alertDiv = document.createElement("div");
    alertDiv.id = "alertDiv"
    alertDiv.className = "alert";
    alertDiv.innerHTML = message + "<br /><br /><button onclick='hideAlert()'>OK</button>";
    let alertAdd = document.getElementById("formBox").appendChild(alertDiv);
}

// This function removes the alert message when the user clicks OK.

function hideAlert(alertDiv) {
    let getAlert = document.getElementById("alertDiv");
    getAlert.parentNode.removeChild(getAlert);
} 

// This function allows you to add a new task after entering the task details by hitting Enter, rather than clicking the Add button.

function detailsKeyPress(e) {
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13) {
        document.getElementById('newTask').click();
        return false;
    }
    return true;
}
