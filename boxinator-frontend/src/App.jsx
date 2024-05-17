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
import ClaimOrder from './ClaimOrder/ClaimOrder';
import { restoreUser } from './RestoreUser/RestoreUser';

const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      restoreUser(storedToken, setUser);

      setLoggedIn(true);
    }

    const storedLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    if (storedLoggedIn) {
      setLoggedIn(storedLoggedIn);
    }
  }, []);


  return (
    <>
      <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, token, setToken }}>
        <div className='app'>
          <Nav />

          {!loggedIn && (
            <Routes>
              <Route path="/" element={<Login />}/>
              <Route path="/:orderId" element={<Login />}/>
              <Route path="/claimorder/:email/:orderId" element={<ClaimOrder />}/>
            </Routes>
          )}

          {loggedIn && (
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/newshipment" element={<NewShipment />} />
            </Routes>
          )}

          {loggedIn && user.hasOwnProperty('role') && (
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