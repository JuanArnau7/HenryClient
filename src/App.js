import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import LocalHome from './components/Local/Home/Home';
import DeliveryHome from './components/Delivery/Home/Home';
import Landing from './components/Landing/Landing';
import Register from './components/Register/Register'
import LoginGoogle from "./components/Login/LoginGoogle";
import CardFood from './components/CardFood/CardFood';
import { useDispatch } from 'react-redux';
import { getAllDishes, getFilterDishes } from "./redux/Actions/actions";
import AlterHome from "./components/Local/Home/AlterHome";
import Login from './components/Login/Login';
import Cart from "./components/Cart/Cart";
import CreateFood from './components/CreateFood/CreateFood';
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
	const dispatch = useDispatch()
	const cartDishes = localStorage.getItem("dishes")
	!cartDishes && localStorage.setItem("dishes", "[]")
	useEffect(() => {
		dispatch(getAllDishes())
		dispatch(getFilterDishes())
	}, [dispatch])

	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route exact path="/" element={<Landing />}></Route>
					<Route exact path="/local/home" element={<LocalHome />} />					
					<Route exact path="/createFood" element={<CreateFood/>} />
					<Route exact path="/local/alterHome" element={<AlterHome />} />
					<Route exact path="/deliver/home" element={<DeliveryHome />} />
					<Route exact path='/dashboard' element={<Dashboard />} />
					<Route exact path='/detailDish/:id' element={<CardFood />} />
					<Route exact path='/register' element={<Register />} />
					<Route exact path='/cart' element={<Cart />} />
					<Route path='/login' element={<Login/>} >
          <Route path='google' element={<LoginGoogle/>} />
        </Route >
				</Routes>
			</BrowserRouter>

		</div>
	);
}

export default App;
