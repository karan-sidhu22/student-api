const Student = require('../models/student');

exports.createStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    if (!name || !email || !age) {
      return res.status(400).json({ message: 'name, email, age are required' });
    }
    const student = await Student.create({ name, email, age });
    return res.status(201).json(student);
  } catch (err) {
    console.error('Create error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllStudents = async (_req, res) => {
  try {
    const students = await Student.findAll({ order: [['id', 'ASC']] });
    return res.json(students);               // <-- ensure we SEND a response
  } catch (err) {
    console.error('List error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    return res.json(student);
  } catch (err) {
    console.error('Get by ID error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const { name, email, age } = req.body;
    await student.update({
      name: name ?? student.name,
      email: email ?? student.email,
      age: age ?? student.age
    });

    return res.json(student);
  } catch (err) {
    console.error('Update error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Student not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
