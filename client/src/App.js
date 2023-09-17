import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { useEffect, useState } from "react";
import AddCompany from "./components/AddCompany";
import Home from "./components/Home";
import Header from "./components/Header";

const App = () => {
  const [ user, setUser ] = useState({});
  const [ token, setToken ] = useState(localStorage.getItem('token') || null);
  const [companyData, setCompanyData] = useState([]);
  const navigate = useNavigate();
  console.log(user);

  const isLoggedIn = () => {
    return !!token;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setUser({});
    navigate("/");
  }

  const getUserDetails = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return;
    }
    
    console.log("Heyyy token profile")
    fetch(`http://localhost:8000/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then((res) => res.json())
    .then(data => {
      console.log(data);
      setUser(data);
    })
  }

  useEffect(() => {
    getUserDetails();
  }, [token]) 

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login user={user} setUser={setUser} setToken={setToken} /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/dashboard" element={ <Dashboard user={user} companyData={companyData} setCompanyData={setCompanyData} /> } />
        <Route path="/addCompany" element={ <AddCompany setCompanyData={setCompanyData} /> } />
      </Routes>
    </div>
  );
}

export default App;
