/* globals require module */


module.exports = function(db) {
    function get(req, res) {

        let clients = db("clients");
        res.json({
            result: clients
        });
    }

    function post(req, res) {
        var client = req.body;
        client.id = 555;

        db('clients').insert(client);
        res.status(201);
    }

    return {
        get: get,
        post: post,
    };
};