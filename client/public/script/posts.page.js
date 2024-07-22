"use strict";
const postForm = window.document.querySelector('form');
const displayPostFormButton = window.document.querySelector('.display-post-form');
const cancelPost = window.document.querySelector('.cancel');
const submitPost = window.document.querySelector('.submit');

displayPostFormButton.addEventListener('click', (e) => {
    // display form
    postForm.style.width = `min(100%, 100%)`;
});
// cancel form post submition and hide the form and clear form inputs.value = ''
const title = window.document.getElementById('title');
const content = window.document.querySelector('textarea');

cancelPost.addEventListener('click', (e) =>  postForm.style.width = `min(0%, 0%)`);
submitPost.addEventListener('submit', (e) => {
    window.setTimeout(() => {
        title.value = '';
        content.value = '';
    })
});

(async function(){
    const postsData = await fetch('http://127.0.0.1:3000/application.com/api/posted-posts-data/posts', {
        method: "GET",
        headers: {
            "content-type": "application/json"
        }
    });

    let postsJsonData = await postsData.json();

    postsJsonData.forEach(element => {
        const section = window.document.createElement('section');
        const profile = window.document.createElement('article');
        const content = window.document.createElement('article');
        const article = window.document.createElement('article');
        const div = window.document.createElement('div');
        const img = window.document.createElement('img');
        img.src = '../../img/profile-image.png'
        div.append(img);

        const fieldset = window.document.createElement('fieldset');
        const h4 = window.document.createElement('h4');
        h4.textContent = element.posted_by;
        const span = window.document.createElement('span');
        span.textContent = element.date_posted; 
        fieldset.append(h4, span);
        profile.append(div, fieldset)

        const paragraph = window.document.createElement('p');
        paragraph.textContent = element.content;

        const postTitle = window.document.createElement('h2');
        postTitle.textContent = element.title;

        const button = window.document.createElement('button');
        button.textContent = 'like'

        const likes = window.document.createElement('span');
        likes.textContent = element.likes
        // button.addEventListner('click', () => {
        //     likes.textContent++
        // })

        article.append(button, likes);
        content.classList.add('content')
        content.append(postTitle, paragraph);
        section.append(profile, content, article);

        window.document.querySelector('main').append(section);
    });
}())

async function likePost(element, likes) {
    element.addEventListner('click', () => {
        likes.textContent++
    })
}