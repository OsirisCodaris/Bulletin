let Activator = require('../models/activator_key')
let randkey = require('random-keygen')
let moment = require ('../config/moment')


let activatorControllers = {
    show : function(req,res){
        Activator.showAll((rows)=>{
            if(rows.length){
                return res.status(200).json(rows)
            }else{
                return res.status(400).end("Une erreur s'est produite")
            }
        })
    }, 
    create : function(req,res,next){
        var key = randkey.get({
            length: 10,
            numbers: true
        })
        let data = req.body
        data.key_gen = key
        Activator.add(data,(result)=>
        {
            if(result.affectedRows){
                data.id_key = result.insertId
                next()
            }else{
                return res.status(400).json({message : "Une erreur s'est produite"})
            }
            
        })
        
    },
    updated : function(req,res){
        let data = req.body
        Activator.update(data,(rows)=>{
            if(rows.affectedRows){
                return res.status(200).send("Requete effectuer")
            }else{
                return res.status(400).send("Une erreur s'est produite")
            }
        })
    },
    isValid : function(req,res,next){
        let data = req.user
        Activator.show(data, (rows) => {
            if (rows) {
                req.user.number_pc = rows.number_pc
                var now = moment()
                var created_at = rows.created_at
                var dateExp = moment(created_at).add(rows.valid_for, 'd')
                if (now.isAfter(dateExp)) {
                    var message = "La clé d'activation n'est plus valide la date d'expiration est dépassé";
                    res.status(400).send(message)
                    return
                } else {
                    next()
                }
                
            } else {
                res.status(404).send("La clé n'est pas valide")
                return
            }
        })
    }
}

module.exports = activatorControllers