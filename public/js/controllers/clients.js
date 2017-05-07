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
            $appContainer.html(template(clients));
        })
        .then(() => {
            $('#dataTable').DataTable();

            $("#dataTable_filter label").addClass("col-sm-8 col-md-8");
            $("#dataTable_filter").append('<button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bs-example-modal-lg">Add Client</button>');

            $('.add-client').on('click', function() {

                $('#add-client-wrapper').removeClass('hidden');
                $('.card').addClass('blur');
                $('#mainNav').addClass('blur');
            });
            $('#add-client-wrapper').on('click', function(el) {

                if ($(el.target)[0].id == 'add-client-wrapper') {

                    $('#add-client-wrapper').addClass('hidden');
                    $('.card').removeClass('blur');
                    $('#mainNav').removeClass('blur');
                }

            });
        });
}

export function addClient() {
    const name = $('#name').val();
    const profession = $('#Profession').val();
    const age = $('#age').val();
    const trainings = $('#trainings').val();
    const endDate = $('#date').val();
    const price = $('#price').val();
    const picture = 'https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-128.png';

    data.addClient(name, profession, age, trainings, endDate, price, picture)
        .then(
            result => {
                toastr.success(`Client ${name} has been added successfully`);
                window.location.hash = '#/clients';
                window.location.reload();


            },
            errorMsg => toastr.error(errorMsg));
}