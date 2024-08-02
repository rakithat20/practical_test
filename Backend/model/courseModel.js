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

class courseModel {
    static async getCount() {
        const result = (await db.query("SELECT COUNT(*) FROM courses")).rows[0];
        return result.count;
    }

    static async getAll() {
        const result = await db.query("SELECT * FROM courses");
        return result.rows;
    }

    static async getById(course_id) {
        const result = await db.query("SELECT * FROM courses WHERE course_id = $1;", [course_id]);
        return result.rows[0];
    }

    static async getByDepartment(department) {
        const result = await db.query("SELECT * FROM courses WHERE department ILIKE $1;", [`%${department}%`]);
        return result.rows;
    }

    static async addCourse(course) {
        const query = `
            INSERT INTO courses (course_id, course_name, department, fee)
            VALUES ($1, $2, $3, $4)
        `;
        const values = [
            course.course_id,
            course.course_name,
            course.department,
            course.fee
        ];
        const result = await db.query(query, values);
        return result;
    }

    static async updateCourse(course_id, course) {
        const query = `
            UPDATE courses
            SET course_name = $1, department = $2, fee = $3
            WHERE course_id = $4
        `;
        const values = [
            course.course_name,
            course.department,
            course.fee,
            course_id
        ];
        const result = await db.query(query, values);
        return result;
    }

    static async deleteById(course_id) {
        const result = await db.query("DELETE FROM courses WHERE course_id = $1;", [course_id]);
        return result;
    }
}

export default courseModel;
