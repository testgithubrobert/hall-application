"use strict";
const currentUser = window.document.getElementById('logged-in-user');
var loader = window.document.getElementById('loader');

(async function(){
    const usersData = await fetch('http://127.0.0.1:3000/application.com/api/registered-users-data/users', {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });

    let usersJsonData = await usersData.json();

    usersJsonData.forEach(async element => {
        const section = window.document.createElement('section');

        const profileImage = window.document.createElement('div');
        profileImage.classList.add('profile-image');

        const img = window.document.createElement('img');
        img.src = '../img/profile-image.png'
        profileImage.append(img);

        const profileInformation = window.document.createElement('div');
        profileInformation.classList.add('profile-information');

        const username = window.document.createElement('span');
        const email = window.document.createElement('span');
        username.classList.add('user-name');
        email.classList.add('user-email');

        username.textContent = `${element.first_name} ${element.last_name}`;
        email.textContent = `${element.email}`;

        const button = window.document.createElement('button');
        button.classList.add('add-friend');
        button.textContent = 'add friend';

        const usersData = await fetch('http://127.0.0.1:3000/application.com/api/registered-users-data/users', {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
        });

    const usersJsonData = await usersData.json();
    const data = decodeURIComponent(document.cookie)
    let user = usersJsonData.find(user => { return user.email.includes(data.slice(13)) });
    user.friends += 1;
    user.points += Math.floor(Math.random() * 5); // set the users points to increase
        button.addEventListener('click', async () => {
            button.disabled = true;
                const postLikes = await fetch('http://127.0.0.1:3000/application.com/api/registered-users-data/users', {
                    method: "PUT",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(user)
                });

            window.location.reload(); // reload the page in order to get the latest updates on an account
            window.setTimeout(() => button.disabled = false, 4000);
        })

        profileInformation.append(username, email, button);
        section.append(profileImage, profileInformation);

        window.setTimeout(() => loader.remove(), 600);
        window.setTimeout(() => window.document.querySelector('main').append(section), 1200);
        username.textContent.includes(JSON.stringify(currentUser.textContent)) ? username.parentElement.remove() : (function(){ return }());
    });
}());

(async function(){
    const usersData = await fetch('http://127.0.0.1:3000/application.com/api/registered-users-data/users', {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });

    const usersJsonData = await usersData.json();
    const data = decodeURIComponent(document.cookie)
    let user = usersJsonData.find(user => { return user.email.includes(data.slice(13)) });

    currentUser.textContent = `${user.first_name.toLocaleUpperCase()} ${user.last_name.toLocaleUpperCase()}`;
}());