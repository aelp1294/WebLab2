var teams = require('../../connectionToDB');

/* funcion get cuando no hay un id */

const GetAllItems = (req, res, next) => {
    teams.find({}, function(err, team) {      
        res.status(200)
        res.json(team)
      });
};

/* funcion get cuando hay un id */
const GetUniqueItem = (req, res, next) => {
    /* revisar si el id existe, si si existe devolver el contenido del id*/
    teams.findById(req.params.id, function(err, team) {
        if(err){
            res.status(404)
            res.send("404 manejado")
        } else{
            res.status(200)
            res.json(teams.find(item => item.id == req.params.id))
        }
    });
};

/* funcion post para insertar un nuevo item */
const AddNewItem = (req,res,next) => {
    const {body} = req
    // Agregar validacion para cuando no hay nada en la tabla?
    /*insertar unicamente si el id y el nombre no se repiten*/
    if((teams.find(item => item.id == body.id) == null) && (teams.find(item => item.nombre == body.nombre) == null) &&body.id != null && body.id > 0 && body.nombre != "" && body.liga != "" && body.campeonatos > 0 && body.puntos >= 0 && body.escudo != ""){

        // create a new user
        var newTeam = team({
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
  
    } else {
        res.status(404)
        res.send("404 manejado")
    }
};

/* funcion put para actualizar un item */
const UpdateItem = (req, res, next) => {
    const { body } = req
    var object = teams.findById(req.params.id, function(err, team){
        /*actualizar unicamente si los campos son validos*/
        if(team != null && (teams.find(item => item.nombre == body.nombre) == null) && body.nombre != "" && body.liga != "" && body.campeonatos > 0 && body.puntos >= 0 && body.escudo != ""){
            var i = teams.indexOf(object)
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
    teams.findById(req.params.id, function(err, team) {
        if(err){
            res.status(404)
            res.send("404 manejado")
        } else{
            team.remove(function(err) {
                if (err){
                    res.status(404)
                    res.send("404 manejado")
                } else {
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