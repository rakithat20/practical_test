import dotenv from 'dotenv';
import pkg from 'pg';

const { Client } = pkg;
dotenv.config();

const db = new Client({
    user: 'postgres',
    host: process.env.DBHOST,
    database: process.env.DB,
    password: process.env.PW,
    port: process.env.DBPORT,
});

db.connect();



class usermodel {
    static async validatePassword(username, password) {
        try {
            const result = await db.query("SELECT password FROM users WHERE username = $1;", [username]);
            const admin = result.rows[0];
            
            if (admin) {
                
                return admin.password === password;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Error validating password:', err);
            throw new Error('Internal server error');
        }
    }

}

export default usermodel