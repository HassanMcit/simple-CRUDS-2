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
                <a href="${inputURL.value.includes(`https://`) ? inputURL.value : "https://" + inputURL.value}" 
                    target="_blank" id="visit">
                    <button type="button" class="btn btn-success">Visit</button>
                </a>
            </td>
            <td class="col-3">
                <button type="button" class="btn btn-danger"
                    id="deleteItem" onclick="deleteThisItem(${i})">Delete</button>
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

function deleteThisItem(index) {
    bookmarkList.splice(index, 1);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
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