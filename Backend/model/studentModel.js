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

class studentModel {
    static async getCount() {
        const result = (await db.query("SELECT COUNT(*) FROM students")).rows[0];
        return result.count;
    }

    static async getAll() {
        const result = await db.query(`
            SELECT students.*, courses.course_name
            FROM students
            JOIN courses ON students.course_id = courses.course_id
        `);
        return result.rows;
    }

    static async getById(student_id) {
        const result = await db.query(`
            SELECT students.*, courses.course_name
            FROM students
            JOIN courses ON students.course_id = courses.course_id
            WHERE students.student_id = $1
        `, [student_id]);
        return result.rows[0];
    }

    static async getByCourseId(course_id) {
        const result = await db.query(`
            SELECT students.*, courses.course_name
            FROM students
            JOIN courses ON students.course_id = courses.course_id
            WHERE students.course_id = $1
        `, [course_id]);
        return result.rows;
    }

    static async addStudent(student) {
        const query = `
            INSERT INTO students (first_name, last_name, birthday, address, contact_number, course_id)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [
            student.firstName,
            student.lastName,
            student.birthday,
            student.address,
            student.contactNumber,
            student.courseId
        ];
        const result = await db.query(query, values);
        return result;
    }

    static async updateStudent(student_id, student) {
        const query = `
            UPDATE students
            SET first_name = $1, last_name = $2, birthday = $3, address = $4, contact_number = $5, course_id = $6
            WHERE student_id = $7
        `;
        const values = [
            student.first_name,
            student.last_name,
            student.birthday,
            student.address,
            student.contact_number,
            student.course_id,
            student_id
        ];
        const result = await db.query(query, values);
        return result;
    }

    static async deleteById(student_id) {
        const result = await db.query("DELETE FROM students WHERE student_id = $1;", [student_id]);
        return result;
    }
}

export default studentModel;
