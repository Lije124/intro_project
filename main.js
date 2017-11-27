function task(date, time, details) {
    this.date = date;
    this.time = time;
    this.details = details;
}

var taskList = [];
var existingTasks = [];

// This function retrieves the existing array from local storage and calls the general display function if there are elements in the array.

function preDisplay() {
    existingTasks = JSON.parse(localStorage.getItem("taskList"));
    if (existingTasks.length > 0) {
        taskList = existingTasks;
        displayTasks();
    };
}

window.onload = preDisplay;

var addTask = document.getElementById("newTask");
var addButton = addTask.addEventListener("click", getTask);

// This function retrieves the new input properties, adds a new element to the array in local storage, clears the input fields, and calls the display function. It prevents execution if you haven't entered all of the values.

function getTask() {

    var taskDate = document.getElementById("date").value;
    if (!taskDate) {
        alert("Please enter the date!");
        return;
    }
    var taskTime = document.getElementById("time").value;
    if (!taskTime) {
        alert("Please enter the time!");
        return;
    }
    var taskDetails = document.getElementById("details").value;
    if (!taskDetails) {
        alert("Please enter the task details!");
        return;
    }
    var listItem = new task(taskDate, taskTime, taskDetails);
    taskList.push(listItem);

    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayTask(listItem);
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("details").value = "";
}

// This function displays the new task without reloading all the existing tasks. It then calls the delete button function.

function displayTask(task) {
    
        var itemIndex = taskList.indexOf(task);

        var itemDiv = document.createElement("div");
        itemDiv.id = "tn" + itemIndex;
        itemDiv.className = "taskNote fade-in";
        var noteAdd = document.getElementById("tasks").appendChild(itemDiv);

        var textDiv = document.createElement("div");
        textDiv.className = "taskText";
        textDiv.innerHTML = taskList[itemIndex].details;
        var textAdd = document.getElementById(itemDiv.id).appendChild(textDiv);

        var timeDiv = document.createElement("div");
        timeDiv.className = "dateTime";
        timeDiv.innerHTML = taskList[itemIndex].date + "<br />" + taskList[itemIndex].time;
        var timeAdd = document.getElementById(itemDiv.id).appendChild(timeDiv);

        var delIcon = document.createElement("div");
        delIcon.id = "di" + itemIndex;
        delIcon.className = "del";
        var delIconAdd = document.getElementById(itemDiv.id).appendChild(delIcon);

        var delButton = document.createElement("button");
        delButton.className = "inv glyphicon glyphicon-trash";
        var delIconAdd = document.getElementById(delIcon.id).appendChild(delButton);

        deleteButtons();  

}

// This function clears the page and loads all of the existing array elements in local storage. It then calls the delete button function.

function displayTasks() {

    var clearBoard = document.getElementById("tasks").innerHTML = "";

    var i = 0;

    do {
        var itemDiv = document.createElement("div");
        itemDiv.id = "tn" + i;
        itemDiv.className = "taskNote fade-in";
        var noteAdd = document.getElementById("tasks").appendChild(itemDiv);

        var textDiv = document.createElement("div");
        textDiv.className = "taskText";
        textDiv.innerHTML = taskList[i].details;
        var textAdd = document.getElementById(itemDiv.id).appendChild(textDiv);

        var timeDiv = document.createElement("div");
        timeDiv.className = "dateTime";
        timeDiv.innerHTML = taskList[i].date + "<br />" + taskList[i].time;
        var timeAdd = document.getElementById(itemDiv.id).appendChild(timeDiv);

        var delIcon = document.createElement("div");
        delIcon.id = "di" + i;
        delIcon.className = "del";
        var delIconAdd = document.getElementById(itemDiv.id).appendChild(delIcon);

        var delButton = document.createElement("button");
        delButton.className = "inv glyphicon glyphicon-trash";
        var delIconAdd = document.getElementById(delIcon.id).appendChild(delButton);

        i += 1;

    } while (i < taskList.length);

  deleteButtons();  

}

// This function calls of the existing array elements and adds a delete function to the trash icon. The delete function fades out the note from which it is called. Reloading the page displays the modified array.

function deleteButtons() {
    var buttons = document.getElementsByClassName("inv");
    var i;
    for (i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            var boxDiv = this.parentElement;
            var taskDiv = boxDiv.parentElement;
            taskDiv.className = "taskNote fade-out";
            var taskId = taskDiv.id;
            var taskIndex = taskId.charAt(taskId.length - 1);
            taskList.splice(taskIndex, 1);
            localStorage.setItem("taskList", JSON.stringify(taskList));
        }
    }
}

// This function allows you to add a new task after entering the task details by hitting Enter, rather than clicking the Add button.

function searchKeyPress(e)
{
    // look for window.event in case event isn't passed in
    e = e || window.event;
    if (e.keyCode == 13)
    {
        document.getElementById('newTask').click();
        return false;
    }
    return true;
}
