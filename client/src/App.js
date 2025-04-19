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
import ProdDetails from './pages/ProdDetails';
import AddOrder from './components/AddOrder';
import AllOrders from './components/AllOrders';
import Cart from './components/Cart';


function App() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.authReducer.user);
  const isAuth = useSelector(state => state.authReducer.isAuth);

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
        <Route path = '/product/:id' element = {<ProdDetails />} />
        {isAuth ? (
          <>
          <Route path = '/profile' element = { <Profile /> } />
          <Route path = '/order' element = { <AddOrder /> } />
          <Route path = '/cart' element = { <Cart />} />
          </>
        ) : (
          <>
        <Route path = '/register' element = { <Register /> } />
        <Route path = '/login' element = { <Login /> } />
          </>
        )}
        
        {user && user.isAdmin &&
        <Route path = '/admin' element = { <Dashboard /> } />}
        {user && user.isAdmin && 
        <Route path = '/admin/orders' element = { <AllOrders /> } />}
        <Route path = '/*' element = { <Error /> } />
      </Routes>
      
    </div>
  );
}

export default App;
