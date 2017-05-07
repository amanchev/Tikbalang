/* globals require module */


module.exports = function(db) {
    let lastId = 41;

    function generateId() {
        return lastId += 1;
    }


    function get(req, res) {

        let clients = db("clients");
        res.json({
            result: clients
        });
    }

    function post(req, res) {
        var client = req.body;





        db('clients').insert(client);
        res.status(201)
            .json({
                result: {
                    client: client.id
                }
            });
    }

    return {
        get: get,
        post: post,
    };
};