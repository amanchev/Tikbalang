import * as data from 'data';
import { load as loadTemplate } from 'templates';


/*
import homeTemplate from 'homeTemplate!text';
const template = Handlebars.compile(homeTemplate);
*/

const $appContainer = $('#app-container');

export function get(params) {

    Promise.all([
            loadTemplate('profile'),
            data.getClients()
        ])
        .then(([template, clients]) => {

            let data = clients.result;

            $appContainer.html(template(data[window.location.hash.split(':')[1] - 1]));
        });
}