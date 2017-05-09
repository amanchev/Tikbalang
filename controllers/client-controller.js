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
        db('clients').shift(client);
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
            "exercises": []
        };
        client.workouts.push(newDate);
        res.status(201)
            .json({
                result: {
                    newDate: newDate
                }
            });
    }

    function postExercise(req, res) {

        const profileId = -(-req.body.profileId);
        const dayId = -(-req.body.dayId);
        const client = db("clients").getById(profileId);

        const day = search(dayId, client.workouts);

        function search(id, myArray) {
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].id === id) {
                    return myArray[i];
                }
            }
        }



        const exercise = req.body;
        day.exercises.push(exercise);
        res.status(201)
            .json({
                result: {
                    exercise: exercise
                }
            });
    }

    return {
        get: get,
        post: post,
        postDate: postDate,
        postExercise: postExercise,
    };
};