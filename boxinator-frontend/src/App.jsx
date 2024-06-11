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
import { countries } from './assets/countries.json'
import Sender from './Sender/Sender';
import Sitemap from './Sitemap/Sitemap';

const UserContext = createContext();

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [order, setOrder] = useState(""); //For guest claiming order
  const [allCountries, setAllCountries] = useState([]);
  const [lightTheme, setLightTheme] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

      restoreUser(storedToken, setUser);

      setLoggedIn(true);
    }

    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn) {
      setLoggedIn(storedLoggedIn);
    }

    const countryNames = countries.map(country => country.country);
    setAllCountries(countryNames);

    const storedLightTheme = localStorage.getItem('lightTheme');
    if (storedLightTheme) {
      setLightTheme(storedLightTheme);
    }
  }, []);


  return (
    <>
      <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn, token, setToken, order, setOrder, allCountries, lightTheme, setLightTheme }}>
        <div className='app' id={lightTheme ? 'app-light' : 'app-dark'}>
          <Nav />

          <main>
            <Routes>
              {!loggedIn ? (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/claimorder/:email/:orderId" element={<ClaimOrder />} />
                </>
              ) : (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/newshipment" element={<NewShipment />} />
                  <Route path="/sitemap" element={<Sitemap />} />

                  {(user.role === 0 || user.role === 1) && (
                    <Route path="/profile" element={<Profile />} />
                  )}
                  
                  {user.role === 0 && (
                    <Route path="/sender/:userId" element={<Sender />} />
                  )}
                </>
              )}
            </Routes>
          </main>

          {loggedIn && (
            <Footer />
          )}
        </div>
      </UserContext.Provider>
    </>
  )
}

export { App, UserContext }