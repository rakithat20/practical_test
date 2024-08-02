import express from 'express';
import usermodel from '../model/userModel.js';  

const router = express.Router();

router.post('/validate', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body)

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const isValid = await usermodel.validatePassword(username, password);

        if (isValid) {
            res.status(200).json({ message: 'Authentication successful' });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error validating user credentials:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
