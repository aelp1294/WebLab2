var express = require('express');
var router = express.Router();
var teams = require('./localStorage');

/* funcion get cuando no hay un id */
router.get('/', function(req, res, next) {
    res.status(200).json(teams)
});

/* funcion get cuando hay un id */
router.get('/:id', function(req, res, next) {
    /* revisar si el id existe, si si existe devolver el contenido del id*/
    if(teams.find(item => item.id == req.params.id) != null){

        res.status(200).json(teams.find(item => item.id == req.params.id))
    }
    else{
        res.status(404).end()
    }    
});

/* funcion post para insertar un nuevo item */
router.post('/', (req,res,next)=> {
    const {body} = req
    /*insertar unicamente si el id y el nombre no se repiten*/
    if((teams.find(item => item.id == body.id) == null) && (teams.find(item => item.nombre == body.nombre) == null) && body.id != null && body.id > 0 && body.nombre != "" && body.liga != "" && body.campeonatos > 0 && body.puntos > 0 && body.escudo != ""){
        teams.push(body)
        res.status(201).end()   
    } else {
        res.status(404).end()
    }
})

/* funcion put para actualizar un item */
router.put('/:id', (req, res, next) => {
    const { body } = req
    var object = teams.find(item => item.id == req.params.id);
        /*actualizar unicamente si los campos son validos*/
    if(object != null && (teams.find(item => item.nombre == body.nombre) == null) && body.nombre != "" && body.liga != "" && body.campeonatos > 0 && body.puntos > 0 && body.escudo != ""){
        var i = teams.indexOf(object)
        teams[i].liga = body.liga;
        teams[i].nombre = body.nombre;
        teams[i].campeonatos = body.campeonatos;
        teams[i].puntos = body.puntos;
        teams[i].escudo = body.escudo;
        res.status(204).end()
    }
    else{
        res.status(404).end()
    }
})

/* funcion delete para eliminar un item */
router.delete('/:id', (req, res, next) => {
    if(teams.find(item => item.id == req.params.id) != null){
        var i = teams.indexOf(object)
        teams.splice(i, 1)
        res.status(204).end()
    }
    else{
        res.status(404).end()
    }   
})

module.exports = router;