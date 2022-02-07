
var config = require('../../appSettings.json');

module.exports = function (req, res, next) {

    if (req.query.hasOwnProperty("_page")) {

        //set current pgae for active pgae item
        res.locals._currentPage = req.query._page || 1;

    } else {

        //set default paging
        req.query._size = config.paging._size || 5;
        req.query._page = config.paging._page || 1;

        res.locals._currentPage = 1;
    }

    next();
}