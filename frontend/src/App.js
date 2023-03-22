import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './screens/Header'
import Welcome from './screens/Welcome'
import Login from './screens/Login'
import Register from './screens/Register'
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
          </Routes>
        </div>
      </Router>
      
    </>
  )
}

export default App

