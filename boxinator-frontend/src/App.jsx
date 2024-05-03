import { useState, createContext, useEffect } from 'react'
import './App.css'
import { Route, Routes } from "react-router-dom";
import Nav from './Nav/Nav';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Footer from './Footer/Footer';
import Profile from './Profile/Profile';
import NewShipment from './NewShipment/NewShipment';

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

  // Once a user has logged in, they are presented with a simple page which shows any 
  // shipments they have under way and recently completed shipments.

  // Once an administrator has logged in they are able to view all current shipments and
  // their respective status’. From here the administrator has the ability to mark a shipment
  // as complete.

  // A guest user must not have access to an account page.
  // A guest user must be able to send a shipment by filling out the needed delivery information 
  // and providing an e-mail only for receipt purposes (this must be clearly communicated to the user), 
  // and not stored by the system in any way

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
              <Route path="/newshipment" element={<NewShipment />} />
            </Routes>
          )}

          {loggedIn && user.role !== 'guest' && (
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