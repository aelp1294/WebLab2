var express = require('express');
var router = express.Router();

var teams = [
    { id: 1, liga: 'Premier League', nombre: 'Liverpool', campeonatos: 6, puntos: 0, escudo: '.\\assets\\images\\liverpool.png'},
    { id: 2, liga: 'La Liga',nombre: 'Barcelona', campeonatos: 5, puntos: 0, escudo: '.\\assets\\images\\barcelona.png'},
    { id: 3, liga: 'Serie A', nombre: 'Napoli', campeonatos: 0, puntos: 3, escudo: '.\\assets\\images\\napoli.png'},
    { id: 4, liga: 'Premier League', nombre: 'Manchester United', campeonatos: 3, puntos: 0, escudo: '.\\assets\\images\\manu.png'},
  ];

/* funcion get cuando no hay un id */
router.get('/', function(req, res, next) {
    res.status(200).json(teams)
});

/* funcion get cuando hay un id */
router.get('/:id', function(req, res, next) {
    var object = teams.find(item => item.id == req.params.id);
    if(object != null){
        res.status(200).end()
    }
    else{
        res.status(404).end()
    }    
});

/* funcion post para insertar un nuevo item */
router.post('/', (req,res,next)=> {
    const {body} = req
    if(teams.find(item => item.id == req.params.id) === null){
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
    if(object != null){
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
    var object = teams.find(item => item.id == req.params.id);
    if(object != null){
        var i = teams.indexOf(object)
        teams.splice(i, 1)
        res.status(204).end()
    }
    else{
        res.status(404).end()
    }   
})

module.exports = router;