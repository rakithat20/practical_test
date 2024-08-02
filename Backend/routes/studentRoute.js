import express from 'express';
import studentModel from '../model/studentModel.js';

const router = express.Router();

router.get('/count', async (req, res) => {
    try {
        const count = await studentModel.getCount();
        res.status(200).json({ count });
    } catch (err) {
        console.error('Error fetching student count:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await studentModel.getAll();
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const result = await studentModel.getById(studentId);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        console.error('Error fetching student by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/course/:name', async (req, res) => {
    const courseName = req.params.name;
    try {
        const result = await studentModel.getByCourse(courseName);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching students by course:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const student = req.body;
    console.log(req.body)
    try {
        const result = await studentModel.addStudent(student);
        res.status(200).json({ message: 'Student added successfully' });
    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const studentId = req.params.id;
    const student = req.body;
    try {
        const result = await studentModel.updateStudent(studentId, student);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Student updated successfully' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const result = await studentModel.deleteById(studentId);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Student deleted successfully' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
