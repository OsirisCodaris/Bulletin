'use strict';
var express = require('express');
var router = express.Router();
var adminControllers = require('../middleware/adminControllers')
var activatorControllers = require('../middleware/activatorControllers')
var Users = require('../models/users')




/* GET home page. */
router.get('/', function (req, res) {

    if(req.session.admin){
        res.render('index', { title: 'Tableau de Bord'});
    }else{
        res.redirect('/gestion/login')
    }
    
});
router.get('/login', function (req, res) {
    if(req.session.admin){
        res.redirect('/gestion')  
    }else{
        res.render('login', { title: 'Connexion' });
    }
});
router.post('/login',adminControllers.auth)

router.get('/logout',function(req,res){
    req.session.destroy();
    res.render('login', { title: 'Connexion' });
})

router.get('/forget',function(req,res){
    res.render('forget-pass',{title : "Mot de passe oublié"})
})
router.post('/forget',function(req,res){
    Users.show(data ,(rows)=>{
        if(rows){
            res.render('forget-pass',{title : "Mot de passe oublié", status : true})
        }else{
            res.render('forget-pass',{title : "Mot de passe oublié", status : false})
        }
    })
    
})
router.get('/keyGenerator', function (req, res) {
    if(req.session.admin){
        res.render('key-generator', { title: 'Générateur de clé' });
    }else{
        res.redirect('/gestion/login')
    }
});
router.get('/keyGenerator/:id', function (req, res) {
    if(req.session.admin){
        Users.show({id : req.params.id},(rows)=>{
            if(rows){
                res.render('key-generator', { title: 'Générateur de clé', user : rows });
            }else{
                res.render('key-generator', { title: 'Générateur de clé', error: "L'utilisateur n'existe pas" });
            }
        })
        
    }else{
        res.redirect('/gestion/login')
    }
});
router.get('/adminUsers', function (req, res) {
    if(req.session.admin){
        res.render('gestion-users', { title: 'Gestion des Utilisateurs' });
    }else{
        res.redirect('/gestion/login')
    }
});
router.get('/comptes', function (req, res) {
    if(req.session.admin){
        res.render('comptes', { title: 'Gestion des Admins' });
    }else{
        res.redirect('/gestion/login')
    }
});

module.exports = router;
