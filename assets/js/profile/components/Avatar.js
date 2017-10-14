import React from 'react';
import { connect } from 'react-redux';
// import { membersOperations } from '../ducks/members/';
import { CardTitle } from 'react-materialize';

const avatarUrl = 'http://www.gravatar.com/avatar/f26f9290731a749a7fbc9ad6fd080827?s=300&d=http%3A%2F%2Fcerkinfo.be%2Fmedia%2F%2Fimages%2Fmembers%2Fdefault-person.png';

const Avatar = ({ avatar, }) => {
  console.log(avatar);
  return (
    <div>
      <CardTitle reveal image={avatar ? avatar : avatarUrl } waves='light'/>
      <a href="" className="btn-floating btn halfway-fab waves-effect waves-light red">
        <i className="material-icons">mode_edit</i>
      </a>
    </div>
  );
}

export default Avatar;
