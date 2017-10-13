import React from 'react';
import { connect } from 'react-redux';
import { membersOperations } from '../ducks/members/';
import { Row, Col, Card, } from 'react-materialize';

const Entry = ({ name, }) => {
  return (
    <li>
      {name}
    </li>
  );
}

const YearList = ({ title, content }) => {
  console.log(content);
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {content.map(x => (<Entry name={x.name}/>))}
      </ul>
    </div>
  );
}

export default YearList;
