const profileName = window.document.querySelector('h1');
const paragraphs = Array.from(window.document.querySelectorAll('p'));
const currentUser = window.document.getElementById('logged-in-user');

(async function(){
    const fetching = await fetch('http://127.0.0.1:3000/application.com/api/registered-users-data/users', {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });

    const jsonData = await fetching.json();
    const cookies = decodeURIComponent(document.cookie);

    let currentUser = jsonData.find(user => { return user.email.includes(cookies.slice(13)) });

    profileName.textContent = `${currentUser.first_name.toLocaleUpperCase()} ${currentUser.last_name.toLocaleUpperCase()}`;
    paragraphs[0].textContent = currentUser.email;
    paragraphs[1].textContent = `Freinds: ${currentUser.friends}`;
    paragraphs[2].textContent = `Points: ${currentUser.points}`;
    paragraphs[3].textContent = `Registered: ${ currentUser.date_registered}`;
    currentcurrentUser.textContent = `${currentUser.first_name.toLocaleUpperCase()} ${currentUser.last_name.toLocaleUpperCase()}`
}());