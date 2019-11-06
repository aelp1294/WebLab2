//DB
var teams = require('../../connectionToDB');
//Redis
var redis = require('redis');
var client = redis.createClient();

client.on('connect', function() {
    console.log('connected');
});

/* funcion get cuando no hay un id */
const GetAllItems = async (req, res, next) => {
    client.exists('team', function(err,reply){
        if(reply == true){
            client.get('team', function(err, reply) {      
                res.status(200)
                res.json(JSON.parse(reply))
            });
        } else{
            teams.find({}, (err,team) => {
                client.set('team', JSON.stringify(team));
                client.expire('team', 180);
                client.get('team', function(err, reply) {      
                    res.status(200)
                    res.json(JSON.parse(reply))
                });
            });
        }
    });

};

/* funcion get cuando hay un id */
const GetUniqueItem = async (req, res, next) => {
    /* revisar si el id existe, si si existe devolver el contenido del id*/
    teams.findOne({id: req.params.id}, function(err, team) {
        if(err){
            res.status(404)
            res.send("404 manejado")
        } else{
            res.status(200)
            res.json(team)
        }
    });
};

/* funcion post para insertar un nuevo item */
const AddNewItem = (req,res,next) => {

    console.log("add backend");
    const {body} = req 
    body.id = 99999;
    console.log(body.id);
    teams.find({}, (err, team) =>{
        if(team.length == 0){
            if(body.id != null && body.id > 0 && body.nombre != "" && body.liga != "" && body.campeonatos > 0 && body.puntos >= 0 && body.escudo != ""){
                // create a new user
                var newTeam = teams({
                    id: 1,
                    liga: body.liga,
                    nombre: body.nombre,
                    campeonatos: body.campeonatos,
                    puntos: body.puntos,
                    escudo: body.escudo
                });
                newTeam.save(function(err){
                    if(err){
                        res.status(404)
                        res.send("404 manejado")
                    } else {
                        res.status(201)
                        res.send("agregado") 
                    }
                });
            /*insertar unicamente si el id y el nombre no se repiten*/
            }
        } else if((team.find(item => item.id == body.id) == null) && (team.find(item => item.nombre == body.nombre) == null) && body.id != null && body.id > 0 && body.nombre != "" && body.liga != "" && body.campeonatos > 0 && body.puntos >= 0 && body.escudo != ""){
            
            teams.findOne({}).sort({id:-1}).limit(1).exec((err, team) =>{
                body.id = team.id + 1;
                console.log(body.id);
                // create a new user
                var newTeam = teams({
                    id: body.id,
                    liga: body.liga,
                    nombre: body.nombre,
                    campeonatos: body.campeonatos,
                    puntos: body.puntos,
                    escudo: body.escudo
                });
                newTeam.save(function(err){
                    if(err){
                        res.status(404)
                        res.send("404 manejado")
                    } else {
                        res.status(201)
                        res.send("agregado") 
                    }
                });
            });       
        }
    })
};

/* funcion put para actualizar un item */
const UpdateItem = (req, res, next) => {
    const { body } = req
    teams.findOne({id: req.params.id}, function(err, team) {
        /*actualizar unicamente si los campos son validos*/
        if(team != null && body.nombre != "" && body.liga != "" && body.campeonatos > 0 && body.puntos >= 0 && body.escudo != ""){
            team.liga = body.liga;
            team.nombre = body.nombre;
            team.campeonatos = body.campeonatos;
            team.puntos = body.puntos;
            team.escudo = body.escudo;
            team.save(function(err){
                if(err){
                    res.status(404)
                    res.send("404 manejado")
                } else {
                    res.status(204)
                    res.send("actualizado") 
                }
            });
        }
        else{
            res.status(404)
            res.send("404 manejado")
        }
    });
};

/* funcion delete para eliminar un item */
const DeleteItem = (req, res, next) => {
    /* tratar de encontrar primero el id en la lista de items */
    teams.findOne({id:req.params.id}, function(err, team) {
        if(err){
            res.status(404)
            res.send("404 manejado")
        } else{
            team.remove(function(err) {
                if (err){
                    res.status(404)
                    res.send("404 manejado")
                } else {
                    teams.find({}, (err,team) => {
                        client.set('team', JSON.stringify(team));
                        client.expire('team', 180);
                    });
                    res.status(204)
                    res.send("borrado")
                }
            });
        }
    });
};

module.exports = {
    GetAllItems,
    GetUniqueItem,
    AddNewItem,
    UpdateItem,
    DeleteItem
};