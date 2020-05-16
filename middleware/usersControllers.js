let Users = require('../models/users')
let encrypt = require('encrypt-password')

let ActivePc = require('../models/pc_actived') 
let Connect = require('../models/pc_connect')



let UsersControllers = {

    show : function (req,res){
        Users.showAll((rows)=>{
            if(rows.length){
                return res.status(200).json(rows)
            }else{
                return res.status(400).end('Aucune donnée')
            }
        })
    },

    create: function (req, res) {
        let data = req.body
        Users.add(data, (rows) => {
            if (rows.message) {
                return res.status(500).send(rows.message)
            } else {
                return res.status(200).json(data)
            }
        })
    },
    mailExist : function (req, res,next) {
        let data = req.body
        Users.show({ email: data.email }, (rows) => {
            if (rows) {
                req.user = rows
                var message = "L'email existe déjà";
                return res.status(400).send(message)
            } else {
                next()
            }
        })
    },
    deleted : function (req,res){
        let data = req.params
        Users.delete(data,(rows)=>{
            if(rows.affectedRows){
                return res.status(200).send("Supprimé avec succès")
            }else{
                return res.status(400).send("Une erreur s'est produite / l'Utilisateur n'existe pas")
            }
        })
    },
    updated: function (req,res){
        let data = req.body
        Users.update(data,(rows)=>{
            console.log(rows)
            if(rows.affectedRows){
                return res.status(200).send("Modifier avec succès")
            }else{
                return res.status(400).send("Une erreur s'est produite / l'Utilisateur n'existe pas")
            }
        })
    },
    check : function (req, res,next) {
        let data = req.body
        console.log(data)
        if (data.password.length >= 6) {
            let password = encrypt(data.password)
            Users.show({ email: data.email }, (rows) => {
                if (rows) {
                    if (rows.password != password) {
                        return res.status(400).end("Mot de passe incorrect ! :(")
                    }else{
                        req.user = rows
                        req.user.adresse_mac = data.adresse_mac
                        next()
                    }
                } else {
                    var message = "L'utilisateur n'existe pas";
                    return res.status(400).send(message)
                }
            })
        }else {
            
            res.status(400).end("Mot de passe trop court ! :(")
            return
        }
    },
    auth: function (req, res) {
        let data = req.user
        ActivePc.show({ id_key: data.id_key }, (rows) => {
            if (rows.find(row => row.adresse_mac == data.adresse_mac)) {
                req.session.user = rows;
                Connect.add(data,(cb)=>{});
                return res.status(200).json(data);
            } else {
                if (rows.length == data.number_pc) {                                        
                    return res.status(404).end("Le nombre d'utilisateur est atteint sur ce compte")
                } else {
                    ActivePc.add(data, (rows) => {
                        if (rows.affectedRows) {                                                    
                            req.session.user = rows;
                            Connect.add(data,(cb)=>{});
                            return res.status(200).json(data);
                        } else {
                            return res.status(500).end(rows.message)
                        }
                    })
                }
            }
        })           
    }

}

module.exports = UsersControllers