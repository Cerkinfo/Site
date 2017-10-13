import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { membersOperations } from '../ducks/members/';
import { Row, Col, Card, } from 'react-materialize';

const Entry = ({ name, start, stop, }) => {
  return (
    <li>
      {moment(start).year()} - {moment(stop).year()}: {name}
    </li>
  );
}

const YearList = ({ title, content }) => {
  console.log(content);
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {content.map(x => (<Entry name={x.name} start={x.start} stop={x.stop}/>))}
      </ul>
    </div>
  );
}

export default YearList;
