import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <>
      <div className='app'>
        <Nav />
        {/* Ej inloggad - visa login sida */}

        {loggedIn && (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        )}

      </div>
    </>
  )
}

export { App }
