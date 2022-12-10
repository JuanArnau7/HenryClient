import React from 'react';
import { Route, Routes} from 'react-router-dom'
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
// import RegisterMenus from './components/RegisterMenus/RegisterMenus';
// import RegisterDishes from './components/RegisterDishes/RegisterDishes';
// import Register from './components/Register/Register'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={ <Landing/> } />

        <Route  path="/home" element={ <Home/> }
        />
        {/* <Route
        exact
        path='/RegisterMenu'
        component={RegisterMenus}
        /> */}
        {/* <Route
        exact
        path='/RegisterDishes'
        component={RegisterDishes}
        /> */}
        {/* <Route
        exact
        path='/Register'
        component={Register}
         />  */}
      </Routes>

    </div>
  );
}

export default App;
