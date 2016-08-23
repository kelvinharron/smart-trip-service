module.exports = function (router) {
    router.route(':/userId')
        .get(function (req, res, next) {
            res.returnValue(user);
        })
        .put
}