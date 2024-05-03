import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Footer from './Footer/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <div className='app'>
        <Nav />

        {!loggedIn && (
        <Routes>
          <Route path="/" element={<Login />}></Route>
        </Routes>
        )}

        {loggedIn && (
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
        )}

        <Footer />
      </div>
    </>
  )
}

export { App }
