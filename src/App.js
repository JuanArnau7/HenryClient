import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import LocalHome from './components/Local/Home/Home';
import DeliveryHome from './components/Delivery/Home/Home';
import Landing from './components/Landing/Landing';
import RegisterMenus from './components/Dashboard/RegisterMenus/RegisterMenus';
import RegisterDishes from './components/Dashboard/RegisterDishes/RegisterDishes';
import Register from './components/Register/Register'
import CardFood from './components/CardFood/CardFood';
import { useDispatch } from 'react-redux';
import { getAllDishes } from "./redux/Actions/actions";
import AlterHome from "./components/Local/Home/AlterHome";
import Login from './components/Login/Login';

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getAllDishes())
	}, [])
	
  return (
    <div>
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Landing/>}></Route>
        <Route exact path="/local/home" element={<LocalHome/>} />
        <Route exact path="/local/alterHome" element={<AlterHome/>} />
        <Route exact path="/deliver/home" element={<DeliveryHome/>} />
        <Route exact path='/dashboard/menus' element={<RegisterMenus/>} />
        <Route exact path='/dashboard/dishes' element={<RegisterDishes/>} />
        <Route exact path='/detailDish/:id' element={<CardFood/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/login' element={<Login/>} />
    </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
