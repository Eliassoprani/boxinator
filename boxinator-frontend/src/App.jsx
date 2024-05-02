import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Nav from './Nav/Nav';

function App() {


  return (
    <>
      <div className='app'>
        <Nav />
        <Routes>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </div>
    </>
  )
}

export { App }
