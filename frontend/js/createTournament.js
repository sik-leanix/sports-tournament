const form = document.getElementById("tournament-form");
const button = document.getElementById("nextButton");
const div = document.getElementById("createTournamentDiv");
let formValues = {}; 

button.addEventListener("click", () => {
    formValues = {
        name: form.name.value,
        description: form.description.value,
        admin_code: form.admin_code.value
    };
    console.log(formValues)
    formSite2();
})

form.addEventListener("submit", function (event) {
    event.preventDefault();

    formValues.url_slug = form.url_slug.value;
    formValues.player_code = form.player_code.value;

    console.log(formValues);
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
            console.log(data);
        } catch(error) {
            console.error(error);
        }
    }
    post(url);
    createTournamentComplition();
});

const formSite2 = () => {
    form.innerHTML = `
    <label for="url_slug"> Link for player registration:</label>
    <input type="text" name="url_slug" class="form-control" placeholder="https://sik-leanix.github.io/tournaments/...">
    <span>This link is required to register for the tournament.</span>
    <label for="player_code"> Players Code: </label>
    <input type="text" class="form-control" name="player_code" placeholder="Player Code...">
    <span>This code can be shared with the participants. It is necessary for the players in the registration prozess.</span>
    <button type="submit" class="btn btn-primary" style="display: block; margin-top: 10vh">Create Tournament</button>
    `
}

const createTournamentComplition = () => {
    div.innerHTML = `
    <h3 style="display: block; text-align: center; padding-top: 10vh; margin: 0 0 15vh 0"> You successfully created a tournament! </h3>
    <p class="tournamentComplete">You can reach the tournament under: </p>
    <a class="tournamentComplete" href="https://sik-leanix.github.io/tournaments/${formValues.url_slug}"> https://sik-leanix.github.io/tournaments/${formValues.url_slug} </a>
    `;
};