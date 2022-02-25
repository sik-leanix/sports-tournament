const form = document.getElementById("tournament-form");
const button = document.getElementById("submitButton");
const div = document.getElementById("createTournamentDiv");

const inputUrlSlug = document.getElementById("inputUrlSlug");
const inputName = document.getElementById("inputName");
const inputDescription = document.getElementById("inputDescription");
const inputAdminCode = document.getElementById("inputAdminCode");

const spanUrlSlug = document.getElementById("inputValidationUrlSlug");
const spanName = document.getElementById("inputValidationName");
const spanDescription = document.getElementById("inputValidationDescription");
const spanAdminCode = document.getElementById("inputValidationAdminCode");

let inputCorrectName = false;
let inputCorrectDescription = false;
let inputCorrectAdminCode = false;
button.disabled = true;

const checkIfAllInputsAreCorrect = () => {
    if (inputCorrectName && inputCorrectDescription && inputCorrectAdminCode) {
        return true
    } else {
        return false
    }
};

const validationValueLength = (inputElement, spanElement, message) => {
    const value = inputElement.value;
    const colorInputRed = () => {
        inputElement.style.borderWidth = "2px";
        inputElement.style.borderColor = "red";
        spanElement.style.color = "red";
        button.disabled = true;
    }
    if (message === "name" && value.length > 40) {
        colorInputRed();
        spanElement.textContent = "The name can be a maximum of 40 characters";
        inputCorrectName = false;
    } else if (message === "description" && value.length > 150) {
        colorInputRed();
        spanElement.textContent = "The name can be a maximum of 150 characters";
        inputCorrectDescription = false;
    } else if (value.length < 3) {
        colorInputRed();
        spanElement.textContent = "It must contain at least three characters";
        if (message === "name") {
            inputCorrectName = false;
        } else {
            inputCorrectDescription = false;
        }
    } else {
        inputElement.style.borderColor = "";
        inputElement.style.borderWidth = "";
        spanElement.textContent = "";
        if (message === "name") {
            inputCorrectName = true;
        } else {
            inputCorrectDescription = true;
        }
        if (checkIfAllInputsAreCorrect()) {
            button.disabled = false;
        }
    }
};

const validateAdminCode = () => {
    const value = inputAdminCode.value;
    if (value.length > 7) {
        inputAdminCode.style.borderColor = "";
        inputAdminCode.style.borderWidth = "";
        spanAdminCode.textContent = "The code is good!";
        spanAdminCode.style.color = "green"
        inputCorrectAdminCode = true;
        if (checkIfAllInputsAreCorrect()) {
            button.disabled = false;
        }
    } else {
        inputAdminCode.style.borderWidth = "2px";
        inputAdminCode.style.borderColor = "red";
        spanAdminCode.textContent = "Passwords must be at least 8 characters.";
        spanAdminCode.style.color = "red";
        inputCorrectAdminCode = false;
        button.disabled = true;
    }
};

const validationValueLengthWithName = () => {
    validationValueLength(inputName, spanName, "name");
}

const validationValueLengthWithDescription = () => {
    validationValueLength(inputDescription, spanDescription, "description");
}

inputName.addEventListener("input", validationValueLengthWithName);
inputDescription.addEventListener("input", validationValueLengthWithDescription);
inputAdminCode.addEventListener("input", validateAdminCode);
inputUrlSlug.addEventListener("input", function () {
    const value = inputUrlSlug.value;
    inputUrlSlug.value = value.replace(/\s+/g, '-').toLowerCase();
    if (inputUrlSlug.value.length < 3 || inputUrlSlug.value.length > 40) {
        inputUrlSlug.style.borderWidth = "2px";
        inputUrlSlug.style.borderColor = "red";
        spanUrlSlug.textContent = "The url slug must be at least 3 and no more than 40 characters long";
        spanUrlSlug.style.color = "red";
    } else {
        inputUrlSlug.style.borderColor = "";
        inputUrlSlug.style.borderWidth = "";
        spanUrlSlug.textContent = "";
    }
})


const urlSlugDiv = document.getElementById("urlSlugDiv");


form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = form.name.value;
    const description = form.description.value;
    const adminCode = form.admin_code.value;

    if (checkIfAllInputsAreCorrect()) {
        const formValues = {
            name: name,
            description: description,
            admin_code: adminCode
        };

    if (urlSlugDiv.style.display === "block") {
        formValues.url_slug = form.url_slug.value;
    }

    async function post(url) {
        try {
            const response = await fetch(url, {
                method: 'post',
                headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
            });

            if (response.status === 500 && urlSlugDiv.style.display === "block") {
                alert("The url-slug is already used!")
            } else if (response.status != 200) {
                urlSlugDiv.style.display = "block";
            } else {
                alert("Successfully created tournament " + formValues.name);
            }
            return response.json();
        } catch(error) {
            console.error(error);
            return null
        }
    }

    const url = 'http://localhost:8000/tournaments';
    post(url);
    }
});

