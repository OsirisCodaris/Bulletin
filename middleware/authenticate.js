module.exports = function (req, res, next) {
    if (req.session.admin) {
        res.locals.admin = req.session.admin
    } else {
        res.locals.admin = undefined
    }
    next()
}