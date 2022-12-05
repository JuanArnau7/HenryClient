import { Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';
import RegisterMenus from './components/RegisterMenus/RegisterMenus';
import RegisterDishes from './components/RegisterDishes/RegisterDishes'
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

      </Switch>

    </div>
  );
}

export default App;
