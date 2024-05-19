// Setting Up variables 
let theInput = document.querySelector('.add-task input');
let theAddButton = document.querySelector('.add-task .plus');
let tasksContainer = document.querySelector('.tasks-content');
let noTasksMsg = document.querySelector('.no-tasks-message');
let tasksStats = document.querySelector('.tasks-stats');
let tasksCount = document.querySelector('.tasks-count span');
let tasksCompleted = document.querySelector('.tasks-completed span');

// ****************************************************************************************
// Focus on input field
window.onload = function () {
    theInput.focus();
}

// ****************************************************************************************
// adding the task
theAddButton.onclick = function () {
    // if input is empty
    if (theInput.value === ''){
        alert('No Value') 
    }
    else {
        let noTasksMsg = document.querySelector('.no-tasks-message');

        //Check if span with no tasks message is exist
        if (document.body.contains(document.querySelector('.no-tasks-message'))){
            noTasksMsg.remove();
        }

        // Create the span Element
        let MianSpan = document.createElement('span');
        MianSpan.innerHTML = `${theInput.value}`;
        MianSpan.className = 'task-box';

        // Create the Delete button
        let deleteElemet = document.createElement('span');
        deleteElemet.innerHTML = 'Delete';
        deleteElemet.className = 'delete';

        // add Delete button to Span
        MianSpan.appendChild(deleteElemet);


        // Ckeck If Task Is Exist
        let MianSpans = document.querySelectorAll('.task-box');
        let ckeck = false;

        for (let index = 0; index < MianSpans.length; index++) {

            if (MianSpans[index].firstChild.nodeValue === theInput.value){
                ckeck = true;
            }

        }

        // Ckeck 
        if (ckeck) {

            // if This value already exists 
            alert('This value already exists');
        } else {
            // add span to Tasks Content
            tasksContainer.appendChild(MianSpan);

            // Calculate Tasks
            calculateTasks();

            // Storage Data
            window.localStorage.setItem('tasksContainer',tasksContainer.innerHTML);
        }
        // empty input value
        theInput.value = '';

        // return focus on field
        theInput.focus();

        // Remove task

        // deleteElemet.onclick = function () {
        //     MianSpan.remove();
        //     tasksContainer.appendChild(noTasksMsg);
        // }
    }
}

// ****************************************************************************************
document.addEventListener('click', function (e) {

    // Delete task
    if (e.target.className === 'delete'){
        // remove current task
        e.target.parentNode.remove();

        // Check all Spans is empty
        let MianSpans = document.querySelectorAll('.task-box');

        if (MianSpans.length === 0) {
            tasksContainer.appendChild(noTasksMsg);
            // createNoTasks();
        }

        // Storage Data
        window.localStorage.setItem('tasksContainer',tasksContainer.innerHTML);
        // Another Solution But No Active In This
        // if (tasksContainer.childElementCount === 0) {
        //     // tasksContainer.appendChild(noTasksMsg);
        //     createNoTasks();

        // }
    }

    // Finish task
    if (e.target.classList.contains('task-box')){

        // Toggle class "finished"
        e.target.classList.toggle('finished')

        // Storage Data
        window.localStorage.setItem('tasksContainer',tasksContainer.innerHTML);
    }

    // Delete All task
    if (e.target.className === 'delete-all'){

        let MianSpans = document.querySelectorAll('.task-box');

        for (let index = 0; index < MianSpans.length; index++) {
            MianSpans[index].remove();
        }
        tasksContainer.appendChild(noTasksMsg);
        // createNoTasks();

        // Storage Data
        window.localStorage.setItem('tasksContainer',tasksContainer.innerHTML);
    }

    // Finish All task
    if (e.target.className === 'finish-all'){

        let MianSpans = document.querySelectorAll('.task-box');

        for (let index = 0; index < MianSpans.length; index++) {
            MianSpans[index].classList.toggle('finished');
        }

        // Storage Data
        window.localStorage.setItem('tasksContainer',tasksContainer.innerHTML);
    }

    // Calculate Tasks
    calculateTasks()

})

// ****************************************************************************************
// Function to create no tasks message
// function createNoTasks() {
    
//     // Create the span ele
//     let msgSpan = document.createElement('span');

//     msgSpan.className = 'no-tasks-message';
    
//     msgSpan.appendChild(document.createTextNode('No Tasks To Show'));

//     // Add the span to tasks content
//     tasksContainer.appendChild(msgSpan);
// }

// ****************************************************************************************

// Function to calculate tasks 
function calculateTasks() {
    
    // calculate all tasks
    tasksCount.innerHTML = document.querySelectorAll('.task-box').length;

    // calculate Completed tasks
    tasksCompleted.innerHTML = document.querySelectorAll('.task-box.finished').length;

    // Storage Data
    window.localStorage.setItem('tasksCount',tasksCount.innerHTML);
    window.localStorage.setItem('tasksCompleted',tasksCompleted.innerHTML);
}

// ****************************************************************************************
// Add Storage In Body
if (window.localStorage.getItem('tasksContainer')){
    tasksContainer.innerHTML = window.localStorage.getItem('tasksContainer');
}
if (window.localStorage.getItem('tasksCount')){
    tasksCount.innerHTML = window.localStorage.getItem('tasksCount');
}
if (window.localStorage.getItem('tasksCompleted')){
    tasksCompleted.innerHTML = window.localStorage.getItem('tasksCompleted');
}
