import React, { useEffect } from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import LocalHome from './components/Local/Home/Home';
import DeliveryHome from './components/Delivery/Home/Home';
import Landing from './components/Landing/Landing';
import RegisterMenus from './components/RegisterMenus/RegisterMenus';
import RegisterDishes from './components/RegisterDishes/RegisterDishes';
import Register from './components/Register/Register'

<<<<<<< HEAD
=======
import CardFood from './components/CardFood/CardFood';
import { useDispatch } from 'react-redux';
import { getAllDishes } from "./redux/Actions/actions";
import AlterHome from "./components/Local/Home/AlterHome";
import Login from './components/Login/Login';
import CreateFood from './components/CreateFood/CreateFood';


>>>>>>> origin/eduardo
function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getAllDishes())
	}, [])
	
  return (
    <div>
<<<<<<< HEAD
      <Switch>
        <Route
          exact
          path="/landing"
          component={Landing} />
        <Route
          exact
          path="/home"
          component={Home}
        />
        <Route
        exact
        path='/RegisterMenu'
        component={RegisterMenus}
        />
        <Route
        exact
        path='/RegisterDishes'
        component={RegisterDishes}
        />
        <Route
        exact
        path='/Register'
        component={Register}
        />
      </Switch>
=======
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Landing/>}></Route>
        <Route exact path="/local/home" element={<LocalHome/>} />
        <Route exact path="/createFood" element={<CreateFood/>} />
        <Route exact path="/local/alterHome" element={<AlterHome/>} />
        <Route exact path="/deliver/home" element={<DeliveryHome/>} />
        <Route exact path='/dashboard/menus' element={<RegisterMenus/>} />
        <Route exact path='/dashboard/dishes' element={<RegisterDishes/>} />
        <Route exact path='/detailDish/:id' element={<CardFood/>} />
        <Route exact path='/register' element={<Register/>} />
        <Route exact path='/login' element={<Login/>} />
    </Routes>
    </BrowserRouter>
>>>>>>> origin/eduardo

    </div>
  );
}

export default App;
