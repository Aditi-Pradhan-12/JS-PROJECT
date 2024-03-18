/* 1] DATA STORED IN ARRAY*/
const state={
    taskList:[],
};

//** DOM (DOCUMENT OBJECT MODAL) **//
const taskContents=document.querySelector(".task__contents");
const taskModal=document.querySelector(".task__modal__body");

//we are going by query selector because if we go with some other mentions like getelemntby(id/class name) etc. we will get the contents from html code to javascript. But now,
//we don't want this, instead we are inducing the codes from javascript to html.ie.e we are going dynamic and not static.

//** HTML TASK CONTENTS (CARDS SECTION) **//

/* CARDS HEADER PART */
const htmlTaskContent=({url,title,type,description,id}) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-primary mr-2" name=${id} onclick="editTask.apply(this, arguments)">
                    <i class="fas fa-pencil-alt" name=${id}></i>
                </button>

                <button type="button" class="btn btn-outline-danger mr-2" name=${id}> onclick="deleteTask.apply(this, arguments)">
                    <i class="fas fa-trash-alt"name=${id}></i>
                </button>
            </div>
            /*********** CARDS BODY PART ***********/
            <div class="card-body">
                ${
                    url ?
                    `<img width="100%" src=${url} alt="card image top" class="card-img-top md-3 rounded-lg"/>`:
                    `<img width="100%" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" 
                    alt="card image top" class="card-img-top md-3 rounded-lg"/>`

                }
                <h4 class="card-title task__card__title">${title}</h4>
                <p class="description card-text trim-3-lines text-muted">${description}</p>
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
            </div>
            /*********** FOOTER PART ***********/
            <div class="card-footer">
                <button class="btn btn-outline-primary float-right" 
                    data-bs-toggle="modal" 
                    data-bs-target="#showTaskModal" 
                    id=${id} onclick="openTask.apply(this, arguments)">Open Task
                </button>
            </div>
        </div>
    </div>
`
//* while mentioning the js code in html, make sure to write a ${} sign for syntax purpose*/
//** id is to identify the card of many cards we will create. Also, while mentioning the things of html in js, quote them in backtics i.e. `` **//

const htmlModalContent=(id, title, url, description)=> {
    const date= new Date(parseInt(id));                             /*to get the current date when the card is created*/
    return `
        <div id=${id}>
        ${
            url &&
            `<img width="100%" 
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" 
            alt="card image top" class="img-fluid place_holder_img md-3 rounded-lg"/>`
        }
        <strong>Created on ${date.toDateString()}</strong>                      /*toDateString is used for having the date in string format and not in integer one*/
        <h2 class="my-3">${title}</h2>
        <p class="lead">${description}</p>
        </div>
    `
}

/* 2] DATA STORED IN local storage (data on local storage should be in string format)*/
const updatelocalstorage =() =>{
    localStorage.setItem("task", JSON.stringify({
        tasks: state.taskList, 
    }))
}

/* 3] DATA STORED IN UI (data in UI should be in JSON format)*/
/*to load initial data*/
const loadInitialData=() => {
    const localStorageCopy = JSON.parse(localStorage.tasks)
    /*an 'if' condition is needed for not having any data stored at first instance, we'll take it from the local storage*/
    if(localStorageCopy) state.taskList = localStorageCopy.task;

    /*tasklist elements/data is stored here*/
    state.taskList.map((cardDate)=>{
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContents(cardDate))
    })
}

/*PARSE FUNCTION WILL CONVERT THE DATA IN JSON FORMAT TO STRING*/
const handleSubmit = (event) =>{
    const id = `${Date.now()}`
    const input ={
        url: document.getElementById(`imageurl`).value, 
        title: document.getElementById(`tasktitle`).value, 
        description: document.getElementById(`taskdescription`).value,
        type: document.getElementById(`tasktype`).value,
    };

    /*we don't want to give the empty cards to the users, so for that we'll put an if condition*/
    if(input.title === "" || input.description === "" || input.type === ""){
        return alert("please fill all required fields");
    }
   taskContents.insertAdjacentHTML("beforeend", htmlTaskContents({
    /*spread operator syntax:console.log({...data}), if the key is already present in our data then it will just go and edit the one and we'll don't have to update it manually.*/
    /*we'll use spread operator here, as we won't be able to update the above 4 criterias individually, everytime we want.*/
        ...input,
        id
   }))
   /*update on array*/
   state.taskList.push({...input, id});
   /*update on local storage*/
   updatelocalstorage();
}

const openTask=(e) => {
    if(!e) e = window.event;

    const getTask=state.taskList.find(({id})=> id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
}

/*DELETE FUNCTIONALITIES i.e data must be deleted from 3 places, the UI, local storage and the array*/
const deleteTask=(e) => {
    if(!e) e = window.event;

    const targetId = e.target.getAttribute("name");
    const type = e.target.tagName;
    
    /*remove the particular card*/
    /*first check whether the entity is present or not*/
    const removeTask = state.taskList.filter(({id})=> id !== targetId);
    
    state.taskList = removeTask;                /*deleted from array*/
    updatelocalstorage();                       /*deleted from localstorage*/
    
    /*deleted from UI*/
    if(type === "BUTTON"){
        return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild;{
            e.target.parentNode.parentNode.parentNode.parentNode
        }
    }
}

/*EDITING FUNCTIONALITIES*/
const editTask=(e) => {
    if(!e) e = window.event;

    const targetId = e.target.id;
    const type = e.target.tagName;
    
    let parentNode;
    let tasktitle;
    let taskdescription;
    let tags;
    let submitButton;

    if(type === "BUTTON"){
        parentNode = e.target.parentNode.parentNode;
    }else{                                                          /*for icon*/
        parentNode = e.target.parentNode.parentNode.parentNode;
    }

    taskdescription = parentNode.childNodes[3].childNodes[5];
    tags = parentNode.childNodes[3].childNodes[7].childNodes[1];
    submitButton = parentNode.childNodes[3].childNodes[5].childNodes[1];

    /*attributes for permission to edit*/
    tasktitle.setAttribute("contenteditable", "true");
    taskdescription.setAttribute("contenteditable", "true");
    tags.setAttribute("contenteditable", "true");

    /*edit the submit button to save the changes made*/
    submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments")

    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
    submitButton.innerHTML = "Save Changes";
}

/*save changes at 3 palces namely, the browser's local storage, the UI and the array*/
const saveEdit = (e) => {
    if(!e) e = window.event;
    const targetId = e.target.id;
    const parentNode = e.target.parentNode.parentNode;

    const tasktitle = parentNode.childNodes[3].childNodes[5];
    const taskdescription = parentNode.childNodes[3].childNodes[5];
    const tags = parentNode.childNodes[3].childNodes[7].childNodes[1];
    const submitButton = parentNode.childNodes[3].childNodes[5].childNodes[1];
    const updatedata = {
        tasktitle: tasktitle.innerHTML,
        taskdescription: taskdescription.innerhtml,
        tags: tags.innerHTML,
    }

    let statecopy = state,tasklist;
    statecopy = statecopy.map((task)=>
        task.id === targetId ?
        {
            id: task.id,
            title: updatedata.tasktitle,
            description: updatedata.taskdescription,
            tags: updatedata.tags,
            url: task.url,
        }
        :
        task
    );
    /*update on current array*/
    state.taskList = statecopy;
    updatelocalstorage();

    /*edit the save changes option*/
    tasktitle.setAttribute("contenteditable", "false");
    taskdescription.setAttribute("contenteditable", "false");
    tags.setAttribute("contenteditable", "false");

    /*changing the button from save chnages to open task*/
    submitButton.setAttribute("onclick", "openTask.apply(this, argument)");
    submitButton.setAttributeAttribute("data-bs-toggle", "modal");
    submitButton.setAttributeAttribute("data-bs-target", "#showTaskModel");
    submitButton.innerHTML = "Open Task";
}

/*SEARCH TAB*/
const searchTask=(e) => {
    if(!e) e = window.event;

    while(taskContents.firstChild){
        taskContents.removeChild(taskContents.firstChild);
    }

    const resultData = state.taskList.filter(({title})=> title.includes(e.target.value));
    /*console.log(resultData)*/

    resultData.map((cardDate)=> {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    })
}