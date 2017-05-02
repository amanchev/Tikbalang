import { MyRouter } from 'myRouter';
import * as homeController from 'homeController';
import * as userController from 'userController';
import * as clientsController from 'clientsController';
import * as profileController from 'profileController';

const router = new MyRouter();





router
    .on('', () => location.hash = '#/home')
    .on('/', () => location.hash = '#/home')
    .on('/home', homeController.get)
    .on('/auth', userController.get)
    .on('/login', userController.login)
    .on('/register', userController.register)
    .on('/logout', userController.logout)
    .on('/clients', clientsController.get)
    .on('/profile/:id', profileController.get);

$(document).ready(() => {


    let isLoggedIn = localStorage.username;
    const usernameSpan = $('#span-username');

    if ((location.hash === '#/auth' || location.hash === '#/login' || location.hash === '#/register')) {

        router.navigate();
    } else if (isLoggedIn) {
        router.navigate();
        usernameSpan.html('<a href="#/profile/:' + isLoggedIn + '">' + isLoggedIn + '</a>');
    } else {
        toastr.success('You are not logged In');
        location.hash = '#/auth';
        router.navigate();
    }
});
$(window).on('hashchange', () => {

    let isLoggedIn = localStorage.username;
    const usernameSpan = $('#span-username');


    if ((location.hash === '#/auth' || location.hash === '#/login' || location.hash === '#/register')) {

        router.navigate();
    } else if (isLoggedIn) {
        router.navigate();
        usernameSpan.html('<a href="#/profile/:' + isLoggedIn + '">' + isLoggedIn + '</a>');

    } else {
        toastr.success('You are not logged In');
        location.hash = '#/auth';
        router.navigate();
    }



});

$(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
});