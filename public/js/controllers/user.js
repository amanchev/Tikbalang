import * as data from 'data';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');

const LOCALSTORAGE_AUTH_KEY_NAME = 'authkey';
const LOCALSTORAGE_USERNAME = 'username';
const AUTH_KEY_HEADER = 'x-auth-key';

export function get(params) {

    const { category } = params;


    loadTemplate('auth')
        .then(template => {
            $appContainer.html(template());

        });
}

export function login() {
    const username = $('#input-username').val();
    const password = $('#input-password').val();
    const passHash = password; // HASH ME

    data.login(username, passHash)
        .then(
            result => {
                localStorage.setItem(LOCALSTORAGE_AUTH_KEY_NAME, result.result.authKey);
                localStorage.setItem(LOCALSTORAGE_USERNAME, username);
                $('#log-in-btn').addClass('hidden');
                $('#register-btn').addClass('hidden');

                toastr.success(`Hi, ${username}`);
                location.href = '#/home';
            },
            errorMsg => toastr.error(errorMsg));
}

export function register() {
    const username = $('#input-username').val();
    const password = $('#input-password').val();
    const passHash = password; // HASH ME

    data.register(username, passHash)
        .then(
            result => {
                toastr.success(`User ${username} registered successfully`);
                login();
            },
            errorMsg => toastr.error(errorMsg));
}

export function logout() {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY_NAME);
    localStorage.removeItem(LOCALSTORAGE_USERNAME);
    $('#log-in-btn').removeClass('hidden');
    $('#register-btn').removeClass('hidden');
    toastr.success('Logged out');
    location.href = '#/auth';
}