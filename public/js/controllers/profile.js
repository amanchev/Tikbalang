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
            loadTemplate('clients'),
            data.getClients()
        ])
        .then(([template, clients]) => {
            console.log(clients.result.clients);
            $appContainer.html(template(clients.result.clients));
        });
}