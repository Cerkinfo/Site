const React = require('react');
const ReactDOM = require('react-dom');
const Events = require('./Events.jsx');

$(document).ready(() => {
  ReactDOM.render(
    <Events events={window.events}/>,
    document.getElementById('events-container')
  );
});
