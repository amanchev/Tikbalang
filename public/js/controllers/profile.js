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
    const id = window.location.hash.split(':')[1];
    const date = $('#date').val();

    data.addTrainingDay(date, id)
        .then(
            result => {
                toastr.success(`Training day ${date} has been added successfully`);
                window.location.hash = '#/profile/:' + id;
                window.location.reload();

            },
            errorMsg => toastr.error(errorMsg));
}
export function addExercise() {

    const re = /[/:]/;
    const hash = window.location.hash.split(re);
    const profileId = hash[3];
    const dayId = hash[5];
    const exercise = $('#exercise').val();
    const series = $('input[name=inlineRadioOptions]:checked', '#series-form').val();
    const reps = $('#reps').val();
    const kg = $('#kg').val();


    data.addExercise(exercise, series, reps, kg, dayId, profileId)
        .then(
            result => {

                toastr.success(`${exercise} has been added successfully`);
                window.location.hash = '#/profile/:' + profileId;
                window.location.reload();
            },
            errorMsg => toastr.error(errorMsg));
}