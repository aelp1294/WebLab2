var express = require('express');
var router = express.Router();

const {
    GetAllItems,
    GetUniqueItem,
    AddNewItem,
    UpdateItem,
    DeleteItem
} = require('../manager/teams')


/* funcion get cuando no hay un id */
router.get('/', GetAllItems);

/* funcion get cuando hay un id */
router.get('/:id', GetUniqueItem);

/* funcion post para insertar un nuevo item */
router.post('/', AddNewItem);

/* funcion put para actualizar un item */
router.put('/:id', UpdateItem);

/* funcion delete para eliminar un item */
router.delete('/:id', DeleteItem);

module.exports = router;