// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import SpaceAPIPin from './SpaceAPIPin';

window.onload = () => {
  ReactDOM.render(<SpaceAPIPin offsetTop={ 50 } url="http://spaceapi.cerkinfo.be/"/>, 
    document.getElementById('react-space-api-pin')
  );
};
