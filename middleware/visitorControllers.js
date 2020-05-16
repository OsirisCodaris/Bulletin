let Visitors = require('../models/visitors')
let Connect = require('../models/pc_connect')


let visitorControllers = {
    Counter : function(req,res){
        Visitors.show((rows)=>{
           if(rows){
                return res.status(200).json(rows)
           }else{
                return res.status(400).end("Une erreur s'est produite")
            }
           
        })
    },
    Increment : function(){
        Visitors.show((rows)=>{
            if(rows.id){
                rows.count++
                Visitors.update(rows,(err)=>{
                    return 0;
                })
                 
            }else{
                 return 0;
            }
            
         })
    },
    ConnectfromApp : function(req,res){
        Connect.showAll((rows)=>{
           if(rows){
                return res.status(200).json(rows)
           }else{
                return res.status(400).end("Une erreur s'est produite")
            }
           
        })
    },
}
module.exports = visitorControllers