import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Welcome from './screens/Welcome'
import Login from './screens/Login'
import Register from './screens/Register'
import Treatments from './screens/Treatments';
import UserList from './components/Admin/UserList';
import BookingList from './components/Admin/BookingList';
import TreatmentList from './components/Admin/TreatmentList';
 // pages to be displayed in the app
function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          
          <Routes>
            
            <Route path='/' element={<Welcome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin/userList'element={<UserList />} />
            <Route path='/admin/treatmentList'element={<TreatmentList />} />
            <Route path='/admin/bookingList'element={<BookingList />} />
            <Route path='/treatments'element={<Treatments />} />
            
          </Routes>
        </div>
      </Router>
      
    </>
  )
}

export default App

