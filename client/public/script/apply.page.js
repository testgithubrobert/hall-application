"use strict";
const passwordStrength = window.document.querySelector('.password-strength');
const passwordInput = window.document.getElementById('password');

passwordInput.addEventListener('input', () => {
    if(passwordInput.value.length < 8) {
        passwordStrength.textContent = 'Password is too weak!';
        passwordStrength.style.color = 'red'
    }else {
        passwordStrength.textContent = 'Password is strong';
        passwordStrength.style.color = 'green'
    }
});