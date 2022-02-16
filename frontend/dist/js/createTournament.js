const form = document.getElementById("tournament-form");
const button = document.getElementById("nextButton");
const div = document.getElementById("createTournamentDiv");

const inputName = document.getElementById("inputName");
const inputDescription = document.getElementById("inputDescription");
const inputAdminCode = document.getElementById("inputAdminCode");

const spanName = document.getElementById("inputValidationName");
const spanDescription = document.getElementById("inputValidationDescription");
const spanAdminCode = document.getElementById("inputValidationAdminCode");

let formValues = {}; 

let inputCorrectName = false;
let inputCorrectDescription = false;
let inputCorrectAdminCode = false;

const checkIfAllInputsAreCorrect = () => {
    if (inputCorrectName && inputCorrectDescription && inputCorrectAdminCode) {
        return true
    } else {
        return false
    }
}


const validationValueLength = (inputElement, spanElement, message) => {
    const value = inputElement.value;
    if (value.length < 3) {
        inputElement.style.borderWidth = "2px";
        inputElement.style.borderColor = "red";
        spanElement.textContent = "It must contain at least three characters";
        spanElement.style.color = "red";
        button.disabled = true;
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
    if (value.match(/^[0-9]+$/)  && value.length > 3) {
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
        spanAdminCode.textContent = "The code must consist of at least four numbers";
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

button.addEventListener("click", () => {
    const name = form.name.value;
    const description = form.description.value;
    const adminCode = form.admin_code.value;

    if (checkIfAllInputsAreCorrect()) {
        formValues = {
            name: name,
            description: description,
            admin_code: adminCode
        };
        formSite2();
    }
})

form.addEventListener("submit", function (event) {
    event.preventDefault();

    formValues.url_slug = form.url_slug.value;
    formValues.player_code = form.player_code.value;

    const url = 'http://localhost:8000/tournaments';

    async function post(url) {
        try {
            const reponse = await fetch(url, {
                method: 'post',
                headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
            });
            const data = await reponse.json();
        } catch(error) {
            console.error(error);
        }
    }
    post(url);
    createTournamentCompletion();
});

const formSite2 = () => {
    form.innerHTML = `
    <label for="url_slug"> Link for player registration:</label>
    <input type="text" name="url_slug" class="form-control" placeholder="https://sik-leanix.github.io/tournaments/..." required>
    <span>This link is required to register for the tournament.</span>
    <label for="player_code"> Players Code: </label>
    <input type="text" class="form-control" name="player_code" placeholder="Player Code..." required>
    <span>This code can be shared with the participants. It is necessary for the players in the registration prozess.</span>
    <button type="submit" class="btn btn-primary" style="display: block; margin-top: 10vh">Create Tournament</button>
    `
}

const createTournamentCompletion = () => {
    div.innerHTML = `
    <h3 style="display: block; text-align: center; padding-top: 10vh; margin: 0 0 15vh 0"> You successfully created a tournament! </h3>
    <p class="tournamentComplete">You can reach the tournament under: </p>
    <a class="tournamentComplete" href="https://sik-leanix.github.io/tournaments/${formValues.url_slug}"> https://sik-leanix.github.io/tournaments/${formValues.url_slug} </a>
    `;
};