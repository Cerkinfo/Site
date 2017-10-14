import React from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import { connect } from 'react-redux';
// import { membersOperations } from '../ducks/members/';
import { CardTitle } from 'react-materialize';
import { Row, Col, Card, } from 'react-materialize';

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

const MembershipMarker = ({infos}) => {
  if (!infos.hasOwnProperty('memberships')) {
    return null;
  }

  const currentYear = infos.memberships.filter(x => {
    const yearRange = moment.range(x.year.start, x.year.stop);
    return yearRange.contains(moment());
  })[0];

  if (!currentYear) {
    return null;
  }

  console.log(currentYear);

  if (currentYear.paid) {
    return (
      <span>
        <i className="fa fa-id-card" aria-hidden="true"></i>
        {`Membre ${moment(currentYear.year.start).year()} - ${moment(currentYear.year.stop).year()}`}
      </span>
    );
  }}

const BirthDay = ({ infos }) => {
  const BirthDayCake = () => (
    <i className="fa fa-birthday-cake" aria-hidden="true"/>
  )

  if (!infos.birthdate) {
    return null;
  }

  return (
    <div>
      <BirthDayCake/> {moment(infos.birthdate).format("D/MM/YYYY")}
    </div>
  );
}

const AsideInfo = ({ infos, isSelf }) => {
  const getName = (infos) => (
    infos.hasOwnProperty('user') && infos.user
      ? infos.user.hasOwnProperty('first_name') && infos.user.hasOwnProperty('last_name')
        ? `${infos.user.first_name} ${infos.user.last_name}`
        :  infos.user.username
      : "null"
    );

  return (
    <Card
      header={<Avatar avatar={infos.avatar}/>}
      title={
        <span className="grey-text text-darken-4">
          {getName(infos)}
        </span>
      }
      reveal={
        <div>
          <span className="card-title grey-text text-darken-4">Surnoms<i className="material-icons right">close</i></span>
          {infos.surnames.map(x => (<p key={x} className="grey-text text-darken-4">{x}</p>))}
        </div>
      }
    >
      <p className="grey-text text-darken-4">
        <BirthDay infos={infos}/>
      </p>
      { infos.hasOwnProperty('balance') ?
        <p className="grey-text text-darken-4">
          Ardoise: {infos.balance} €
        </p>
      : null}
      <p className="grey-text text-darken-4">
        <MembershipMarker infos={infos}/>
      </p>
      { isSelf ? (
        <div className="card-action">
          <a className="waves-effect waves-light btn" href="#barcode_modal">Carte membre</a>
        </div>
      ) : null }
    </Card>
  );
}

export default AsideInfo;
