const form = document.getElementById("tournament-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formValues = {
        name: form.name.value,
        player_code: form.player_code.value,
        admin_code: form.admin_code.value
    };

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
});
