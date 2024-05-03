import { useState, createContext, useEffect } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Footer from './Footer/Footer';
import Profile from './Profile/Profile';

const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(user);
      setLoggedIn(true);
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
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
      </UserContext.Provider>
    </>
  )
}

export { App }