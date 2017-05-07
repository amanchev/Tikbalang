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

    function postDate(req, res) {

        var client = db._.getById(db.clients, 1);

        var newDate = req.body;
        client.workouts.push(newDate);
        res.status(201)
            .json({
                result: {
                    newDate: newDate
                }
            });
    }

    return {
        get: get,
        post: post,
        postDate: postDate,
    };
};