import * as data from 'data';
import { load as loadTemplate } from 'templates';

/*
import homeTemplate from 'homeTemplate!text';
const template = Handlebars.compile(homeTemplate);
*/

const $appContainer = $('#app-container');

export function get(params) {
    const { category } = params;

    Promise.all([
            loadTemplate('home'),

        ])
        .then(([template]) => {
            $appContainer.html(template());
        })
        .then(() => {
            $(".sidebar-nav a").on("click", function() {
                $(".sidebar-nav").find(".active").removeClass("active");
                $(this).parent().addClass("active");
            });
        });
}