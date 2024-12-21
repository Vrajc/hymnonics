import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState, useEffect } from 'react';
import Welcome from './pages/Welcome';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [token, setToken] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const auth = async() => {
    const response = await fetch(`http://localhost:3000/api/home/${token}`, {
      method: 'GET',
    })

    const data = await response.json();

    console.log(data);
    if(data.success){
      setIsAdmin(data.isAdmin);
    }
  }

  useEffect(() => {
      auth();
  }, [])

  return(
    <div className='overflow-hidden'>
      <Routes>
        <Route path='/' element={isLoggedIn ? (<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} user={user} isAdmin={isAdmin} token={token} />) : (<Welcome />)} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} isLoggedIn={isLoggedIn} setToken={setToken}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='*' element={<Welcome />} />
      </Routes>
    </div>
  );
}
export default App
