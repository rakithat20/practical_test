import { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch students and courses data from the API
    axios.get('http://localhost:3000/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost:3000/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const filteredStudents = students.filter(student =>
    student.first_name.toLowerCase().includes(search.toLowerCase()) ||
    student.last_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddStudent = () => {
    window.location.href = '/add-student'; // Redirect to the add student page
  };

  const handleAddCourse = () => {
    window.location.href = '/add-course'; // Redirect to the add course page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600">Admin Dashboard</h1>
        <p className="text-lg text-gray-700">Manage student and course data</p>
      </header>

      <div className="mb-8">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search students..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div className="mb-8 flex justify-between">
        <button
          onClick={handleAddStudent}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Add Student
        </button>
        <button
          onClick={handleAddCourse}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Add Course
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Students</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="w-1/6 px-4 py-2">First Name</th>
                <th className="w-1/6 px-4 py-2">Last Name</th>
                <th className="w-1/6 px-4 py-2">Birthday</th>
                <th className="w-1/6 px-4 py-2">Address</th>
                <th className="w-1/6 px-4 py-2">Contact Number</th>
                <th className="w-1/6 px-4 py-2">Course Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.student_id}>
                  <td className="border px-4 py-2">{student.first_name}</td>
                  <td className="border px-4 py-2">{student.last_name}</td>
                  <td className="border px-4 py-2">{new Date(student.birthday).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{student.address}</td>
                  <td className="border px-4 py-2">{student.contact_number}</td>
                  <td className="border px-4 py-2">{student.course_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Courses</h2>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="w-1/3 px-4 py-2">Course Name</th>
                <th className="w-1/3 px-4 py-2">Department</th>
                <th className="w-1/3 px-4 py-2">Fee</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.course_id}>
                  <td className="border px-4 py-2">{course.course_name}</td>
                  <td className="border px-4 py-2">{course.department}</td>
                  <td className="border px-4 py-2">${course.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
