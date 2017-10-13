import React from 'react';
import { connect } from 'react-redux';
// import { membersOperations } from '../ducks/members/';
import { CardTitle } from 'react-materialize';

const Avatar = ({ avatar, }) => {
  console.log(avatar);
  return (
    <div>
      <CardTitle reveal image={avatar} waves='light'/>
      <a href="" className="btn-floating btn halfway-fab waves-effect waves-light red">
        <i className="material-icons">mode_edit</i>
      </a>
    </div>
  );
}

export default Avatar;
