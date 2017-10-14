import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { membersOperations } from '../ducks/members/';
import { Row, Col, Card, } from 'react-materialize';

const Entry = ({ name, start, stop, }) => {
  return (
    <li>
      <a href={`/fr/cipedia/year/${moment(start).year()}`}>
        {moment(start).year()} - {moment(stop).year()}
      </a>: {name}
    </li>
  );
}

const YearList = ({ title, content }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {content.map(x => (<Entry key={`${x.start}-${x.name}`} name={x.name} start={x.start} stop={x.stop}/>))}
      </ul>
    </div>
  );
}

export default YearList;
