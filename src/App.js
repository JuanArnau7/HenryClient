import { Route, BrowserRouter, Routes } from 'react-router-dom'
import LocalHome from './components/Local/Home/Home';
import DeliveryHome from './components/Delivery/Home/Home';
import Landing from './components/Landing/Landing';
import RegisterMenus from './components/RegisterMenus/RegisterMenus';
import RegisterDishes from './components/RegisterDishes/RegisterDishes';
import Register from './components/Register/Register'

function App() {
  return (
    <div>
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

    </div>
  );
}

export default App;
