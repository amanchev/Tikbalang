/* globals require module */


module.exports = function(db) {
    function get(req, res) {
        let clients = db("clients");
        res.json({
            result: clients
        });
    }

    return { get: get };
};