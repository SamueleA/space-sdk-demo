import {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {
  Auth,
  Album,
} from './views';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/auth">
            <Auth />
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
