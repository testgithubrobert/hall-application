const postForm: HTMLFormElement = window.document.querySelector('form') as HTMLFormElement;
const displayPostFormButton: HTMLButtonElement = window.document.querySelector('.display-post-form') as HTMLButtonElement;
const cancelPost: HTMLButtonElement = window.document.querySelector('.cancel') as HTMLButtonElement;

displayPostFormButton.addEventListener('click', (e: any) => {
    // display form
    postForm.style.width = `min(100%, 100%)`;
});

// cancel form post submition and hide the form and clear form inputs.value = ''
const title: HTMLInputElement = window.document.getElementById('title') as HTMLInputElement;
const content: HTMLTextAreaElement = window.document.querySelector('textarea') as HTMLTextAreaElement;

cancelPost.addEventListener('click', (e: any) => {
    // hide form
    postForm.style.width = `min(0%, 0%)`;
});