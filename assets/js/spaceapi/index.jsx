const React = require('react');
const ReactDOM = require('react-dom');
const SpaceAPIPin = require('./SpaceAPIPin').SpaceAPIPin; 

window.onload = () => {
  ReactDOM.render(<SpaceAPIPin offsetTop={ 50 } url="http://spaceapi.cerkinfo.be/"/>, 
    document.getElementById('react-space-api-pin')
  );
};
