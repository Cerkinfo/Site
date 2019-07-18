import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Page.jsx';

window.markdown_page_render = (url, dest) => {
  ReactDOM.render(<Page url={url}/>,
    document.getElementById(dest)
  );
};
