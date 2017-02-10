const React = require('react');
const ReactDOM = require('react-dom');
const Products = require('./products.jsx');

window.onload = () => {
  ReactDOM.render(<Products/>, 
    document.getElementById('react-products-list')
  );
};
