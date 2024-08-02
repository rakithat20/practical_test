import express from 'express';
import courseModel from '../model/courseModel.js';

const router = express.Router();

router.get('/count', async (req, res) => {
    try {
        const count = await courseModel.getCount();
        res.status(200).json({ count });
    } catch (err) {
        console.error('Error fetching course count:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const result = await courseModel.getAll();
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching courses:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
        const result = await courseModel.getById(courseId);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        console.error('Error fetching course by ID:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/department/:name', async (req, res) => {
    const departmentName = req.params.name;
    try {
        const result = await courseModel.getByDepartment(departmentName);
        res.status(200).json(result);
    } catch (err) {
        console.error('Error fetching courses by department:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    const course = req.body;
    try {
        const result = await courseModel.addCourse(course);
        res.status(201).json({ message: 'Course added successfully', result });
    } catch (err) {
        console.error('Error adding course:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    const courseId = req.params.id;
    const course = req.body;
    try {
        const result = await courseModel.updateCourse(courseId, course);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Course updated successfully' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        console.error('Error updating course:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const courseId = req.params.id;
    try {
        const result = await courseModel.deleteById(courseId);
        if (result.rowCount > 0) {
            res.status(200).json({ message: 'Course deleted successfully' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (err) {
        console.error('Error deleting course:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
