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
    let li = document.createElement("li");
    li.innerHTML = text;
    inProgressContainer.appendChild(li);
    saveData();
}

listContainer.addEventListener("dragstart", dragStart);
inProgressContainer.addEventListener("dragover", allowDrop);
inProgressContainer.addEventListener("drop", dropTask);



listContainer.addEventListener("click", function(e){
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();