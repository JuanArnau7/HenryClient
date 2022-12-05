import { Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home';
import Landing from './components/Landing/Landing';

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
      </Switch>

    </div>
  );
}

export default App;
