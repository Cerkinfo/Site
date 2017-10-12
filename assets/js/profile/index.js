import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Main = () => (
  <Provider store={configureStore({})}>
    <Router>
      <div>
        <Route path="/:lang/cipedia/member/:id" component={Profile}/>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(<Main/>,
  document.getElementById('react-profile')
);
