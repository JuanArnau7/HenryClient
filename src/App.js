import { Route, BrowserRouter, Routes } from 'react-router-dom'
import LocalHome from './components/Local/Home/Home';
import DeliveryHome from './components/Delivery/Home/Home';
import Landing from './components/Landing/Landing';
import RegisterMenus from './components/Dashboard/RegisterMenus/RegisterMenus';
import RegisterDishes from './components/Dashboard/RegisterDishes/RegisterDishes';
import Register from './components/Register/Register'

import Login from './components/Login/Login'


function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Landing/>}></Route>
        <Route exact path="/local/home" element={<LocalHome/>} />
        <Route exact path="/deliver/home" element={<DeliveryHome/>} />
        <Route exact path='/dashboard/menus' element={<RegisterMenus/>} />
        <Route exact path='/dashboard/dishes' element={<RegisterDishes/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/login' element={<Login/>} />
    </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
