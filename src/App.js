import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import RegisterMenus from './components/RegisterMenus/RegisterMenus';
import RegisterDishes from './components/RegisterDishes/RegisterDishes';
import Register from './components/Register/Register'

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Landing/>}></Route>
        <Route exact path="/Home" element={<Home/>} />
        <Route exact path='/RegisterMenus' element={<RegisterMenus/>} />
        <Route exact path='/RegisterDishes' element={<RegisterDishes/>} />
        <Route exact path='/Register' element={<Register/>} />
    </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
