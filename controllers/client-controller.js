/* globals require module */


module.exports = function(db) {
    function get(req, res) {

        let clients = db("clients");
        res.json({
            result: clients
        });
    }

    function getById(id, req, res) {
        let client = db("clients")
            .map(function(client) {
                if (client.id === id)

                    return {
                    result: client
                };
            });




        res.json({
            result: client
        });
    }
    return {
        get: get,
        getById: getById
    };
};