const React = require('react');
const ReactDOM = require('react-dom');
const Events = require('./Events.jsx');

window.eventsRender = (datas) => {
  ReactDOM.render(<Events data={datas}/>, document.getElementById('react-events-timeline'));
};
