import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import NavBar from './components/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { currentUser } from './JS/actions/authAction';
import Dashboard from './pages/Dashboard';

function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user);

  // If the user is already authenticated
  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(currentUser())
    }
  }, [dispatch]);
  
  return (
    <div className="App">

{/* Navbar  */}
      <NavBar />
      
      <h1>Glory Games e-Commerce MERN</h1>
{/* Main Routes  */}
      <Routes>
        <Route path = '/' element = { <Home /> } />
        <Route path = '/profile' element = { <Profile /> } />
        <Route path = '/register' element = { <Register /> } />
        <Route path = '/login' element = { <Login /> } />
        {user && user.isAdmin &&
        <Route path = '/admin' element = { <Dashboard /> } />}
        <Route path = '/*' element = { <Error /> } />
      </Routes>
      
    </div>
  );
}

export default App;
