import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const AddStudent = () => {
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    birthday: '',
    address: '',
    contactNumber: '',
    courseId: '',
    courseName: '',
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setStudent(prevStudent => ({
      ...prevStudent,
      [id]: value
    }));
  };

  const handleCourseChange = (e) => {
    const selectedCourse = courses.find(course => course.course_id === parseInt(e.target.value));
    setStudent(prevStudent => ({
      ...prevStudent,
      courseId: e.target.value,
      courseName: selectedCourse ? selectedCourse.course_name : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/students', student, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 200) {
        toast.success('Added Successfull')
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 2000);
        setStudent({
          firstName: '',
          lastName: '',
          birthday: '',
          address: '',
          contactNumber: '',
          courseId: '',
          courseName: '',
        });
      }
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
         
      <div className="w-96 p-6 bg-white rounded-md shadow-md text-left">
      <div><Toaster/></div>
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">Add Student</h1>
        <hr className="mt-3 mb-5" />
        <form onSubmit={handleSubmit}>
          <div className="text-left mb-4">
            <label htmlFor="firstName" className="block pb-2 text-xl">First Name</label>
            <input
              type="text"
              id="firstName"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter first name"
              value={student.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-left mb-4">
            <label htmlFor="lastName" className="block pb-2 text-xl">Last Name</label>
            <input
              type="text"
              id="lastName"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter last name"
              value={student.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-left mb-4">
            <label htmlFor="birthday" className="block pb-2 text-xl">Birthday</label>
            <input
              type="date"
              id="birthday"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={student.birthday}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-left mb-4">
            <label htmlFor="address" className="block pb-2 text-xl">Address</label>
            <input
              type="text"
              id="address"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter address"
              value={student.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-left mb-4">
            <label htmlFor="contactNumber" className="block pb-2 text-xl">Contact Number</label>
            <input
              type="text"
              id="contactNumber"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter contact number"
              value={student.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-left mb-4">
            <label htmlFor="courseId" className="block pb-2 text-xl">Course</label>
            <select
              id="courseId"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={student.courseId}
              onChange={handleCourseChange}
              required
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.course_id} value={course.course_id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          </div>
          <hr className="py-3" />
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-24 h-9 bg-blue-600 text-white text-center py-1 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
