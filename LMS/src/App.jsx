
import './App.css'
import { BrowserRouter , Routes,Route } from 'react-router-dom';
import Home from './assets/components/Home';
import Login from './assets/components/Login';
import Dashboard from './assets/components/Dashboard';
import AddStudent from './assets/components/AddStudent';
import AddCourse from './assets/components/AddCourse';

function App() {
 
  return (
    <BrowserRouter>
     <main>
       <Routes>
         <Route path='/'element={<Home/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path='/add-student' element={<AddStudent/>}/>
         <Route path='/add-course' element={<AddCourse/>}/>
         
       </Routes>
     </main>
   </BrowserRouter>
   );
}

export default App
