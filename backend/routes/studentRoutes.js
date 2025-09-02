const express = require('express');
const ctrl = require('../controllers/studentController.js'); // explicit .js helps

const router = express.Router();

router.post('/', ctrl.createStudent);
router.get('/', ctrl.getAllStudents);
router.get('/:id', ctrl.getStudentById);
router.put('/:id', ctrl.updateStudent);
router.delete('/:id', ctrl.deleteStudent);

module.exports = router;    // export the router itself
