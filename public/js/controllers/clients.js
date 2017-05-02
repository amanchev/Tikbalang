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

            $("#dataTable_filter label").addClass("col-sm-6 col-md-6");
            $("#dataTable_filter").append('<button class="add-client col-sm-6 col-md-3 col-md-offset-12">Add client</button>');

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