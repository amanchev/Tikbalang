import { MyRouter } from 'myRouter';
import * as homeController from 'homeController';
import * as userController from 'userController';
import * as clientsController from 'clientsController';
import * as profileController from 'profileController';

const router = new MyRouter();

let isLoggedin = userController.isLoggedin;
if (!isLoggedin) {
    location.hash = '#/auth';
}


router
    .on('', () => location.hash = '#/home') // fix later
    .on('/', () => location.hash = '#/home')
    .on('/home', homeController.get)
    .on('/auth', userController.get)
    .on('/login', userController.login)
    .on('/register', userController.register)
    .on('/logout', userController.logout)
    .on('/clients', clientsController.get)
    .on('/profile', profileController.get);

//$(window).on('load', () => router.navigate());
$(document).ready(() => router.navigate());
$(window).on('hashchange', () => {
    if (!isLoggedin && !(location.hash !== '/#auth' || location.hash !== '#/login' || location.hash !== '#/register')) {
        toastr.success('You are not logged In');

        location.hash = '#/auth';
        router.navigate();

    } else {
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