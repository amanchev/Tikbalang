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
        client.workouts = [];
        db('clients').insert(client);
        res.status(201)
            .json({
                result: {
                    client: client.id
                }
            });
    }

    function postDate(req, res) {

        const id = req.body.id;
        const client = db("clients").getById(+id);
        var newDate = {
            "date": req.body.date,
            "id": client.workouts.length,
            "exercises": {}
        };


        console.log(newDate);



        client.workouts.push(newDate);
        res.status(201)
            .json({
                result: {
                    newDate: newDate
                }
            });
    }

    function postExercise(req, res) {

        var client = db("clients").getById(1);
        var newDate = req.body;
        console.log(client);

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