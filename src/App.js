import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  Signin,
  Signup,
  Album,
} from './views';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Album />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
