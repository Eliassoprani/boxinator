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
import { urlBackendBasePath } from './assets/strings';

const UserContext = createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      //Obs getUser körs innan setToken är klar. (Obs2 Körs endast om man refreshar när man är i Dashboard component)
      getUser(storedToken);

      setLoggedIn(true);
    }
  }, []);

  const getUser = async (storedToken) => {
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${storedToken}`
    };
    
    const fetchUserResponse = await fetch(`${urlBackendBasePath}/authentication/getUser`, {
      method: "GET",
      headers: headers
    });

    if (!fetchUserResponse.ok) {
      throw new Error("Failed to get user from the database");
    }

    const returnedUser = await fetchUserResponse.json();

    setUser(returnedUser);
  }

  useEffect(() => {
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