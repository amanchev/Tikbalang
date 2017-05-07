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
export function addTrainingDay() {
    const date = $('#date').val();


    data.addTrainingDay(date)
        .then(
            result => {
                toastr.success(`Client ${name} has been added successfully`);



            },
            errorMsg => toastr.error(errorMsg));
}