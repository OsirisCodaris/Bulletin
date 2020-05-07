let Admins = require('../models/admin')
let encrypt = require('encrypt-password')

let adminControllers = {
    auth : function(req,res){
        let data = req.body;
        if(data.password.length >=6){
            let password = encrypt(data.password)
            Admins.show({email : data.email},(rows)=>{
                if(rows.row){
                    if(rows.row.password == password){
                        req.session.admin = rows.row
                        return res.status(200).json(rows.row)
                    }else{
                        return res.status(400).send("information incorrect")
                    }
                    
                }else{
                    return res.status(400).send("information incorrect")
                }
            })
        }else{
            return res.status(400).send("Information incorrect")
        }
        
    },
    update : function(req,res){
        let data = req.body
       
        if(data.password.length >=6){
            data.password = encrypt(data.password)
            Admins.update(data,(err)=>{
                if(!err.affectedRows){
                    return res.status(400).send("Une erreur s'est produite")
                }else{
                    return res.status(200).send("requete effectué")
                }
            })
        }else{
            return res.status(400).send("Information incorrect")
        }
    },
    create :  function(req,res){
        let data =  req.body
        if(data.password.length >=6){
            data.password = encrypt(data.password)
            Admins.showAll((rows)=>{
                var row = rows.find((result)=> result.email == data.email ? true : false)
                if(row){
                    return res.status(400).send("L'email existe déja")
                }else{
                    Admins.add(data,(err)=>{
                        if(!err.affectedRows){
                            return res.status(400).send("Une erreur s'est produite")
                        }else{
                            return res.status(200).send("requete effectué")
                        }
                    })
                }
            })
            
        }else{
            return res.status(400).send("Mot de passe trop court")
        }
        
    },
    show : function(req,res){
        Admins.showAll((rows)=>{
            if(rows){
                return res.status(200).json(rows)
            }else{
                return res.status(400).send("Une erreur s'est produite")
            }
        })
    },
    deleted : function(req,res){
        let data =  req.params
        Admins.del(data,(err)=>{
           if(err.affectedRows){
                return res.status(200).json("Administrateur supprimé")
            }else{
                return res.status(400).send("Une erreur s'est produite")
            }
        })
    }

}
module.exports = adminControllers