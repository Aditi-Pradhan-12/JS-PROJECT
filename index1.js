const state={
    taskList:[],
};

//** DOM (DOCUMANT OBJECT MODAL) **//
const taskContents=document.querySelector(".task__contents");
const taskModal=document.querySelector(".task__modal__body");

//we are going by query selector because if we go with some other mentions like getelemntby(id/class name) etc. we will get the contents from html code to javascript. But now,
//we don't want this, instead we are inducing the codes from javascript to html.ie.e we are going dynamic and not static.

//** HTML TASK CONTENTS **//
const htmlTaskContents=(url,title,type,description,id) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm task__card">
            <div class="card-header d-flex justify-content-end task__card__header">
                <button type="button" class="btn btn-outline-primary mr-2" name=${id}>
                    <i class="fas fa-pencil-alt"name=${id}></i>
                </button>

                <button type="button" class="btn btn-outline-danger mr-2" name=${id}>
                    <i class="fas fa-trash-alt"name=${id}></i>
                </button>
            </div>
        </div>
    </div>
`
//* while mentioning the js code in html, make sure to write a ${} sign for syntax purpose*/
//** id is to identify the card of many cards we will create. Alos, while mentioning the things of html in js, quote them in backtics i.e. `` **//