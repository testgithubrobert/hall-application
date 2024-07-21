"use strict";
const button = window.document.querySelector('button');
    button.addEventListener('click', () => {
        button.disabled = true;
        window.location.reload();

        window.setTimeout(() => button.disabled = false, 2000)
    });