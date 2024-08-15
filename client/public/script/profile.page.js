const profileName = window.document.querySelector('h1');
const paragraphs = Array.from(window.document.querySelectorAll('p'));
const currentUser = window.document.getElementById('logged-in-user');

(async function(){
    const fetching = await fetch('/application.com/api/registered-users-data/users', {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });

    const jsonData = await fetching.json();
    const cookies = decodeURIComponent(document.cookie);

    let user = jsonData.find(user => { return user.email.includes(cookies.slice(13)) });

    profileName.textContent = `${user.first_name.toLocaleUpperCase()} ${user.last_name.toLocaleUpperCase()}`;
    paragraphs[0].textContent = user.email;
    paragraphs[1].textContent = `Freinds: ${user.friends}`;
    paragraphs[2].textContent = `Points: ${user.points}`;
    paragraphs[3].textContent = `Registered: ${ user.date_registered}`;
    currentUser.textContent = `${user.first_name.toLocaleUpperCase()} ${user.last_name.toLocaleUpperCase()}`
}());