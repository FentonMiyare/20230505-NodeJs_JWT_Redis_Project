var config = require('../config/db.config');
const Response = require("../utils/response")


exports.indexResponse = function(req, res) {
    // let message = `Server running at http://${config.HOST}:${config.PORT}`;
    // res.status(200).send(Response({}, true, false, message, 200))
    res.status(200)
        .render('index', { title: 'Home' })
}
