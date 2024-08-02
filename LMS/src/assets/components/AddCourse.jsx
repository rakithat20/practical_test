import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const AddCourse = () => {
  const [course_id, setCourseId] = useState('');
  const [course_name, setCourseName] = useState('');
  const [department, setDepartment] = useState('');
  const [fee, setFee] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      course_id,
      course_name,
      department,
      fee
    };
    console.log(newCourse)
    axios.post('http://localhost:3000/courses/', newCourse)
      .then(res => {
        if(res.status===201){
            toast.success('Added Successfull')
            // Clear form fields
            setCourseId('');
            setCourseName('');
            setDepartment('');
            setFee('');
        }
      
      })
      .catch(err => {
        console.error('Error adding course:', err);
        alert('Error adding course');
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-8 text-center">
      <div><Toaster/></div>

        <h1 className="text-4xl font-bold text-blue-600">Add New Course</h1>
        <p className="text-lg text-gray-700">Fill out the form to add a new course</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Course ID</label>
          <input
            type="text"
            value={course_id}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Course Name</label>
          <input
            type="text"
            value={course_name}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Fee</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Add Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;
