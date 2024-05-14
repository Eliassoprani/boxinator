import { useState, createContext, useEffect } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Footer from './Footer/Footer';
import Profile from './Profile/Profile';
import NewShipment from './NewShipment/NewShipment';
import AboutUs from './AboutUs/AboutUs';

const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const storedLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    if (storedLoggedIn) {
      setLoggedIn(storedLoggedIn);
    }
  }, []);


  return (
    <>
      <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
        <div className='app'>
          <Nav />

          <Routes>
            <Route path="/aboutus" element={<AboutUs />} />
          </Routes>

          {!loggedIn && (
            <Routes>
              <Route path="/" element={<Login />}></Route>
              <Route path="/:orderId" element={<Login />}></Route>
            </Routes>
          )}

          {loggedIn && (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/newshipment" element={<NewShipment />} />
            </Routes>
          )}

          {loggedIn && user.role !== 2 && (
            <Routes>
              <Route path="/profile" element={<Profile />} />
            </Routes>
          )}

          <Footer />
        </div>
      </UserContext.Provider>
    </>
  )
}

export { App, UserContext }