const form = document.getElementById("tournament-form");

console.log("Loaded createTournament.js");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formValues = {
        name: form.name.value,
        player_code: form.player_code.value,
        admin_code: form.admin_code.value
    };

    fetch('http://localhost:8000/tournaments', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
    }).then(function(res) {
        return res.json();
    }).then(function(text){
        return console.log(text)
    }).catch(function(error) {
        console.log(error)
    })
});