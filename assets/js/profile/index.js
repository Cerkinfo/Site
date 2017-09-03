import React from 'react';
import ReactDOM from 'react-dom';
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Test = () => (
  <div>
    test
  </div>
);

const Main = () => (
  <Router>
    <div>
      <Route path="/:lang/cipedia/:id" component={Test}/>
    </div>
  </Router>
);

ReactDOM.render(<Main/>,
  document.getElementById('react-profile')
);
