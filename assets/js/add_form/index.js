import React from 'react';
import ReactDOM from 'react-dom';
import Container from './form.jsx';

window.onload = () => {
  ReactDOM.render(<Container/>, 
    document.getElementById('react-add-form')
  );
};
