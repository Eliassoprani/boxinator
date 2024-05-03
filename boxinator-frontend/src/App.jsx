import { useState } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Footer from './Footer/Footer';
import Profile from './Profile/Profile';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

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
          <Route path="/profile" element={<Profile />} />
        </Routes>
        )}

        <Footer />
      </div>
    </>
  )
}

export { App }
