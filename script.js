const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const inProgressContainer = document.getElementById("inprogress-list");
const doneList = document.getElementById("done-list");

function addTask(){
    if(inputBox.value === ''){
        console.log("Input is empty");
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        li.draggable = true;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = '';
    saveData();
}

inputBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function dragStart(event) {
    console.log("dragStart event triggered");
    event.dataTransfer.setData("text/plain", event.target.innerHTML);
}

function allowDrop(event) {
    console.log("allowDrop event triggered");
    event.preventDefault();
}

function dropTask(event) {
    console.log("dropTask event triggered");
    event.preventDefault();
    let text = event.dataTransfer.getData("text/plain");

    if(!taskExistsInContainer(text, event.target)) {
        let li = document.createElement("li");
        li.innerHTML = text;
        event.target.appendChild(li);
        li.draggable = true;
        saveData();
    }
    else{
        alert("Task already exists in this container.");
        console.log("task already exists")
    }
    
}

function taskExistsInContainer(taskText, container) {
    const taskElements = container.querySelectorAll("li");
    for(let i = 0; i < taskElements.length; i++){
        if(taskElements[i].innerHTML === taskText) {
            return true;
        }
    }
    return false;
}

listContainer.addEventListener("dragstart", dragStart);
listContainer.addEventListener("dragover", allowDrop);
listContainer.addEventListener("drop", dropTask);
inProgressContainer.addEventListener("dragover", allowDrop);
inProgressContainer.addEventListener("drop", dropTask);
inProgressContainer.addEventListener("dragstart", dragStart);
doneList.addEventListener("dragover", allowDrop);
doneList.addEventListener("drop", dropTask);
doneList.addEventListener("dragstart", dragStart);


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

inProgressContainer.addEventListener("click", function(e){
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

doneList.addEventListener("click", function(e){
    if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("todoData", listContainer.innerHTML);
    localStorage.setItem("inProgressData", inProgressContainer.innerHTML);
    localStorage.setItem("doneData", doneList.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("todoData");
    inProgressContainer.innerHTML = localStorage.getItem("inProgressData");
    doneList.innerHTML = localStorage.getItem("doneData");
}
showTask();