import './css/profile.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Profile from './components/Profile';
import {
  BrowserRouter as Router,
  Route,
  Link,
  browserHistory,
} from 'react-router-dom';

const Main = () => (
  <Provider store={configureStore({})} history={browserHistory}>
    <Router>
      <div>
        <Route path="/:lang/cipedia/member/:id" component={Profile}/>
        <Route path="/:lang/cipedia/profile" component={Profile}/>
      </div>
    </Router>
  </Provider>
);

$(document).ready( () => {
  ReactDOM.render(<Main/>,
    document.getElementById('react-profile')
  );
});
