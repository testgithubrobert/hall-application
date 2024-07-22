"use strict";

(async function(){
    const usersData = await fetch('http://127.0.0.1:3000/application.com/api/registered-users-data/users', {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });

    let usersJsonData = await usersData.json();

    usersJsonData.forEach(element => {
        const section = window.document.createElement('section');

        const profileImage = window.document.createElement('div');
        profileImage.classList.add('profile-image');

        const img = window.document.createElement('img');
        img.src = '../img/profile-image.png'
        profileImage.append(img);

        const profileInformation = window.document.createElement('div');
        profileInformation.classList.add('profile-information');

        const loggedInUserName = window.document.createElement('span');
        const loggedInUserEmail = window.document.createElement('span');
        loggedInUserName.classList.add('logged-in-user-name');
        loggedInUserEmail.classList.add('logged-in-user-email');

        loggedInUserName.textContent = `${element.first_name} ${element.last_name}`;
        loggedInUserEmail.textContent = `${element.email}`;

        const button = window.document.createElement('button');
        button.classList.add('profile');
        button.textContent = 'profile'

        profileInformation.append(loggedInUserName, loggedInUserEmail, button);
        section.append(profileImage, profileInformation);

        window.document.querySelector('main').append(section)
    });
}())

// <section>
//     <div class="profile-image">
//         <img src="../../img/profile-image.png" alt="">
//             </div>
//                 <div class="profile-information">
//                     <span class="logged-in-user-name">John Doe</span>
//                     <span class="logged-in-user-email">JohnDoe123@gmail.com</span>
//                     <br>
//                     <button type="button" class="profile" id="profile" title="profile">profile</button>
//             </div>
//      </section>