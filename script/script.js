var inputBookmark = document.getElementById("inputBookmark");
var inputURL = document.getElementById("inputURL");
var liveToastBtn = document.getElementById("liveToastBtn");
var visit = document.getElementById("visit");
var deleteItem = document.getElementById("deleteItem");
var tbody = document.getElementById("tbody");
var alertbox = document.getElementById("alert");
const exampleModal = document.getElementById('exampleModal');
var accept = document.getElementById("accept");
var error = document.getElementById("error");
const toastTrigger = document.getElementById('Btn');
const toastLiveExample = document.getElementById('liveToast');
var globalIndex;

if (toastTrigger) {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
    toastTrigger.addEventListener('click', () => {
        toastBootstrap.show()
    })
}

liveToastBtn.addEventListener('shown.bs.modal', () => {
    exampleModal.focus()
})

var bookmarkList = [];

if (localStorage.getItem("bookmark")) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
    displayURL();
}

function addURL() {
    var bookmark = {
        name: inputBookmark.value,
        url: inputURL.value,
    };
    validateInput(inputBookmark);
    validateInput(inputURL);
    if (inputBookmark.classList.contains("is-valid") && inputURL.classList.contains("is-valid")) {
        bookmarkList.push(bookmark);
        localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
        displayURL();
        clearForm();
        inputBookmark.classList.remove("is-valid");
        inputURL.classList.remove("is-valid");
    }
}

function displayURL() {
    var box = "";
    for (var i = 0; i < bookmarkList.length; i++) {
        box += `
        <tr class="row px-3">
            <th scope="row" class="col-3 pt-3">${i + 1}</th>
            <td class="col-3 pt-3">${bookmarkList[i].name}</td>
            <td class="col-3">
                <a href="${bookmarkList[i].url.includes(`https://`) ? bookmarkList[i].url : "https://" + bookmarkList[i].url}" 
                    target="_blank" id="visit">
                    <button type="button" class="btn btn-danger text-white">
                    <i class="fa-solid fa-eye pe-1 d-none d-md-inline"></i> Visit</button>
                </a>
            </td>
            <td class="col-3">  
                <button type="button" class="btn btn-dark px-1 px-lg-2" id="deleteItem" data-bs-toggle="modal" data-bs-target="#modal2" onclick="setIndexOfDeletedItem(${i})">
                <i class="fa-solid fa-trash-can pe-1 d-none d-md-inline"></i> Delete</button>
                <div class="modal fade" id="modal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title text-center fs-5" id="exampleModalLabel">Are You Sure?</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-dark" data-bs-dismiss="modal" onclick="deleteThisItem()">Yes Delete</button>
                    </div>
                    </div>
                </div>
                </div>
            </td>
        </tr>
        `;
    }
    tbody.innerHTML = box;
}

function clearForm() {
    inputBookmark.value = "";
    inputURL.value = "";
}

function setIndexOfDeletedItem (index) {
    globalIndex = index;

}

function deleteThisItem() {
    bookmarkList.splice(globalIndex, 1);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
    if(bookmarkList.length == 0) {
        localStorage.clear();
    }
    globalIndex = '';
    displayURL();
}

function validateInput(element) {
    var regex = {
        inputBookmark: /^\w{3,}(\s+\w+)*$/,
        inputURL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/,
    };
    if (regex[element.id].test(element.value)) {
        element.nextElementSibling.classList.replace("d-block", "d-none");
        element.classList.add("is-invalid");
        element.classList.replace("is-invalid", "is-valid");
    } else {
        element.classList.add("is-invalid");
        element.nextElementSibling.classList.replace("d-none", "d-block");
        element.classList.replace("is-valid", "is-invalid");
    }
    if (inputBookmark.classList.contains("is-valid") && inputURL.classList.contains("is-valid")) {
        accept.classList.replace("d-none", "d-block");
        error.classList.replace("d-block", "d-none");
    } else {
        error.classList.replace("d-none", "d-block");
        accept.classList.replace("d-block", "d-none");
    }
}