const React = require('react');
const ReactDOM = require('react-dom');
const Form = require('./form.jsx');

window.onload = () => {
  ReactDOM.render(<Form/>, 
    document.getElementById('react-buy-form')
  );
};
