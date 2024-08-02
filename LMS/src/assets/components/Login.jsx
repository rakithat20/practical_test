import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSetEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  }

  
  const handleLogin = async (e) => {
    e.preventDefault();
  

    try {
        const response = await axios.post(
            'http://localhost:3000/users/validate',
            { username: email, password: password },
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } } 
          );

      console.log(response.data);
      
      if (response.status === 200) {
       
        console.log('Login successful');
        toast.success('login Successfull')
        
        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('login failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div><Toaster/></div>

      <div className="w-96 p-6 bg-white rounded-md shadow-md text-left">
        <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">Login</h1>
        <hr className="mt-3 mb-5" />
        <form onSubmit={handleLogin}>
          <div className="text-left mb-4">
            <label htmlFor="email" className="block pb-2 text-xl">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={handleSetEmail}
            />
          </div>
          <div className="text-left mb-4">
            <label htmlFor="password" className="block pb-2 text-xl">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={handleSetPassword}
            />
          </div>
          <hr className="py-3" />
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-20 h-9 bg-blue-600 text-white text-center py-1 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
