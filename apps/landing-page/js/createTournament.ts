const form = document.getElementById('tournament-form') as HTMLFormElement;
const button = document.getElementById('submitButton') as HTMLButtonElement;
const div = document.getElementById('createTournamentDiv');

const inputUrlSlug = document.getElementById('inputUrlSlug') as HTMLInputElement;
const inputName = document.getElementById('inputName') as HTMLInputElement;
const inputDescription = document.getElementById('inputDescription') as HTMLInputElement;
const inputAdminCode = document.getElementById('inputAdminCode') as HTMLInputElement;

const spanUrlSlug = document.getElementById('inputValidationUrlSlug') as HTMLSpanElement;
const spanName = document.getElementById('inputValidationName') as HTMLSpanElement;
const spanDescription = document.getElementById('inputValidationDescription') as HTMLSpanElement;
const spanAdminCode = document.getElementById('inputValidationAdminCode') as HTMLSpanElement;

let inputCorrectName = false;
let inputCorrectDescription = false;
let inputCorrectAdminCode = false;
button.disabled = true;

const checkIfAllInputsAreCorrect = () => {
  if (inputCorrectName && inputCorrectDescription && inputCorrectAdminCode) {
    return true;
  } else {
    return false;
  }
};

const validationValueLength = (inputElement: HTMLInputElement, spanElement: HTMLSpanElement, message: string) => {
  const value = inputElement.value;
  const colorInputRed = () => {
    inputElement.style.borderWidth = '2px';
    inputElement.style.borderColor = 'red';
    spanElement.style.color = 'red';
    button.disabled = true;
  };
  if (message === 'name' && value.length > 40) {
    colorInputRed();
    spanElement.textContent = 'The name can be a maximum of 40 characters';
    inputCorrectName = false;
  } else if (message === 'description' && value.length > 150) {
    colorInputRed();
    spanElement.textContent = 'The name can be a maximum of 150 characters';
    inputCorrectDescription = false;
  } else if (value.length < 3) {
    colorInputRed();
    spanElement.textContent = 'It must contain at least three characters';
    if (message === 'name') {
      inputCorrectName = false;
    } else {
      inputCorrectDescription = false;
    }
  } else {
    inputElement.style.borderColor = '';
    inputElement.style.borderWidth = '';
    spanElement.textContent = '';
    if (message === 'name') {
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
  if (value.length > 7 && value.match(/^\S*$/)) {
    inputAdminCode.style.borderColor = '';
    inputAdminCode.style.borderWidth = '';
    spanAdminCode.textContent = 'The code is good!';
    spanAdminCode.style.color = 'green';
    inputCorrectAdminCode = true;
    if (checkIfAllInputsAreCorrect()) {
      button.disabled = false;
    }
  } else {
    inputAdminCode.style.borderWidth = '2px';
    inputAdminCode.style.borderColor = 'red';
    spanAdminCode.textContent = 'Passwords must be at least 8 characters long and must not contain whitespaces.';
    spanAdminCode.style.color = 'red';
    inputCorrectAdminCode = false;
    button.disabled = true;
  }
};

const validationValueLengthWithName = () => {
  validationValueLength(inputName, spanName, 'name');
};

const validationValueLengthWithDescription = () => {
  validationValueLength(inputDescription, spanDescription, 'description');
};

inputName.addEventListener('input', validationValueLengthWithName);
inputDescription.addEventListener('input', validationValueLengthWithDescription);
inputAdminCode.addEventListener('input', validateAdminCode);
inputUrlSlug.addEventListener('input', function () {
  const value = inputUrlSlug.value;
  inputUrlSlug.value = value.replace(/\s+/g, '-').toLowerCase();
  if (inputUrlSlug.value.length < 3 || inputUrlSlug.value.length > 40) {
    inputUrlSlug.style.borderWidth = '2px';
    inputUrlSlug.style.borderColor = 'red';
    spanUrlSlug.textContent = 'The url slug must be at least 3 and no more than 40 characters long';
    spanUrlSlug.style.color = 'red';
  } else {
    inputUrlSlug.style.borderColor = '';
    inputUrlSlug.style.borderWidth = '';
    spanUrlSlug.textContent = '';
  }
});

const urlSlugDiv = document.getElementById('urlSlugDiv') as HTMLDivElement;

form.addEventListener('submit', async function (event: SubmitEvent) {
  event.preventDefault();

  if (!checkIfAllInputsAreCorrect()) {
    return;
  }

  const name = inputName.value;
  const description = inputDescription.value;
  const adminCode = inputAdminCode.value;

  const formValues: TournamentFormData = {
    name: name,
    description: description,
    admin_code: adminCode
  };

  if (urlSlugDiv.style.display === 'block') {
    formValues.url_slug = form.url_slug.value;
  }

  const tournament = await postTournament(formValues);
  if (tournament.errors) {
    const message = tournament.errors[0]?.message;
    if (message?.match(/(Key\ )\(url_slug\)=(.+)(?=(already exists.))/) && urlSlugDiv.style.display === 'block') {
      // TODO: show red error message below url slug input "URL slug is already used."
    } else if (message?.match(/(Key\ )\(url_slug\)=(.+)(?=(already exists.))/)) {
      urlSlugDiv.style.display = 'block';
    }
  }
});

interface TournamentFormData {
  name: string;
  description: string;
  admin_code: string;
  url_slug?: string;
}

async function postTournament(data: TournamentFormData) {
  try {
    // TODO: change to non-localhost URL for production
    const response = await fetch('http://localhost:8000/tournaments', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const tournament: any = response.json();
    if (response.status === 201) {
      window.location.href = '/tournament/' + tournament.url_slug + '/admin';
    }
    return tournament;
  } catch (error) {
    console.error(error);
    return null;
  }
}
