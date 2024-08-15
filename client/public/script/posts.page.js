const socket = new WebSocket("ws://localhost:3000");
socket.addEventListener('open', (soc) => socket.send('connection request made!'));
socket.addEventListener('message', (message) => console.log(message));
socket.addEventListener('error', (error) => console.log(error));

// import createPost from "./module/posts/module.posts";

const postForm = window.document.querySelector('form');
const displayPostFormButton = window.document.querySelector('.display-post-form');
const cancelPost = window.document.querySelector('.cancel');
const submitPost = window.document.querySelector('.submit');
const title = window.document.getElementById('title');
const content = window.document.querySelector('textarea');
var text = window.document.createElement('h2');

displayPostFormButton.addEventListener('click', (e) => { postForm.style.width = `min(100%, 100%)` });
cancelPost.addEventListener('click', (e) =>  { 
    title.value = '';
    content.value = '';
    postForm.style.width = `min(0%, 0%)` });
submitPost.addEventListener('submit', (e) => { title.value = ''; content.value = '' });

async function createPost(element) {
    const section = window.document.createElement('section');
    const profile = window.document.createElement('article');
    const content = window.document.createElement('article');
    const article = window.document.createElement('article');
    const form = window.document.createElement('div');
    const input = window.document.createElement('input');
    input.maxLength = '50'
    const comment = window.document.createElement('button');

    input.type = 'text';
    comment.type = 'button';
    comment.textContent = 'comment';

    comment.addEventListener('click', () => {
        if(input.value.length < 1 || input.value === '') {
            return ''
        } else {
            // update comments for post
            alert(false)
        }
    });

    input.name = 'comment';
    input.placeholder = 'comment here...';

    form.classList.add('comment-scetion');
    form.append(input, comment);

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


    button.textContent = 'like';
    button.classList.add('like-button')
    button.classList.add('comment-button')

    const likes = window.document.createElement('span');
    likes.textContent = element.likes

    article.append(button, likes);
    content.classList.add('content')
    content.append(postTitle, paragraph);
    section.append(profile, content, form, article);
    likePost(button, element) // add likes to a certain post

    window.document.querySelector('main').append(section);
}

(async function(){
    const postsData = await fetch('/application.com/api/posted-posts-data/posts', { method: "GET", headers: {
            "content-type": "application/json"
        }});

    let postsJsonData = await postsData.json();
    
    if(postsJsonData.length < 1) {
        text.textContent = 'No posts posted yet!';
        text.setAttribute('class', 'warning');
        window.document.querySelector('main').append(text);
        return;
    } else postsJsonData.forEach(element => { createPost(element) });
}());

const currentUser = window.document.getElementById('logged-in-user');

(async function(){
    const usersData = await fetch('/application.com/api/registered-users-data/users', { method: "GET", headers: {
            "content-type": "application/json"
        }});

    try {
        const usersJsonData = await usersData.json();
        const data = decodeURIComponent(document.cookie)
    
        let user = usersJsonData.find(user => { return user.email.includes(data.slice(13)) })
    
        if(!user.first_name || !user.last_name || typeof user === 'undefined') {
            currentUser.textContent = 'No profile!';
            return;
        } else currentUser.textContent = `${user.first_name.toLocaleUpperCase()} ${user.last_name.toLocaleUpperCase()}`;
               window.document.getElementById('postedUser').value  = `${user.first_name.toLocaleUpperCase()} ${user.last_name.toLocaleUpperCase()}`
    } catch (error) {
        currentUser.textContent = 'No profile!';
        // console.log(error.message)
    }
}());


// like a post 
async function likePost(element, object) {
    element.addEventListener('click', async () => {
        element.disabled = true;
        object.likes += 1;
        await fetch('/application.com/api/posted-posts-data/posts', { method: "PUT", headers: {
                "content-type": "application/json"
            }, body: JSON.stringify(object) });

        window.location.reload(); // reload the page in order to get the latest updates on a post
        window.setTimeout(() => element.disabled = false, 4000);
    });
}