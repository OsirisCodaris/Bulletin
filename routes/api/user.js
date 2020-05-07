'use strict';
var express = require('express');
var router = express.Router();
var UsersController = require('../../middleware/usersControllers');
var ActivatorController = require('../../middleware/activatorControllers');

var Users = require('../../models/users')
// create new user
router.route('/')
    .get(UsersController.show)
    .post(UsersController.mailExist,ActivatorController.create,UsersController.create)
    .put(UsersController.updated)

router.route('/:id')
    .delete(UsersController.deleted)

router.route('/auth')
    .post(UsersController.check,ActivatorController.isValid,UsersController.auth)
/*router.route('/add')
    .post(UsersController.create)
// authentification user
router.route('/auth')
    .post(UsersController.check)
// show user
router.get('/:find/show', function (req, res) {
    if (!isNaN(req.params.find)) {
        Users.show({ id: req.params.find }, (rows) => {
            if (rows.row) {
                res.status(200).json(rows.row)
            } else {
                var erreur = " Utilisateur n'existe pas";
                res.status(400).json(erreur);
            }
            
        })
    } else {
        Users.show({ email: req.params.find }, (rows) => {
            res.status(200).json({ classe: rows.row })
        })
    }

});*/

module.exports = router;
