"use strict";
const postForm = window.document.querySelector('form');
const displayPostFormButton = window.document.querySelector('.display-post-form');
const cancelPost = window.document.querySelector('.cancel');
displayPostFormButton.addEventListener('click', (e) => {
    // display form
    postForm.style.width = `min(100%, 100%)`;
});
// cancel form post submition and hide the form and clear form inputs.value = ''
const title = window.document.getElementById('title');
const content = window.document.querySelector('textarea');
cancelPost.addEventListener('click', (e) => {
    // hide form
    postForm.style.width = `min(0%, 0%)`;
});

const data = decodeURIComponent(document.cookie)
console.log(document.cookie)
console.log(data)