import React from 'react';
import Avatar from './Avatar';
import YearList from './YearList';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { membersOperations } from '../ducks/members/';
import { Row, Col, Card, } from 'react-materialize';

class Profile extends React.Component {
  componentWillMount() {
    this.props.fetchDetail(this.props.match.params.id);
  }

  getBapteme(current) {
    return _.flatten(current.memberships.map(x => x.postes.filter(x => !x.is_bapteme)));
  }

  getPoste(current) {
    return _.flatten(current.memberships.map(x => x.postes.filter(x => x.is_bapteme)));
  }

  isSelf() {

  }

  render() {
    const current = this.props.members[this.props.match.params.id] || {};

    if (!current.hasOwnProperty("id")) {
      return (<div>Loading</div>);
    }

    return (
      <Row className="profile_content">
        <Col s={2} m={2} l={12}/>
        <Col s={8} m={8} l={4}>
          <Card
            header={<Avatar/>}
            title={
              <span className="grey-text text-darken-4">
                { current.first_name && current.last_name
                  ? `${current.first_name} ${current.last_name}`
                  : current.username
                }
              </span>
            }
            reveal={
              <div>
                <span className="card-title grey-text text-darken-4">Surnoms<i className="material-icons right">close</i></span>
                {current.surnames.map(x => (<p key={x} className="grey-text text-darken-4">{x}</p>))}
              </div>
            }
          >
            <p className="grey-text text-darken-4">
                {current.birthdate}
            </p>
            { current.hasOwnProperty('ardoise') ?
              <p className="grey-text text-darken-4">
                Ardoise: {current.balance} €
              </p>
            : null}
            { current ? (
              <div className="card-action">
                <a className="waves-effect waves-light btn" href="#barcode_modal">Carte membre</a>
              </div>
            ) : null }
          </Card>
        </Col>
        <Col s={2} m={2} l={1}/>
        <Col s={12} m={12} l={6}>
          <div className="career">
            <YearList
              title="Comités de Cercle"
              content={this.getPoste(current)}
            />

            <div className="divider"></div>

            <YearList
              title="Parcours Folklorique"
              content={this.getBapteme(current)}
            />
          </div>

          <div className="divider"></div>
        </Col>
        <Col s={12} m={12} l={1}/>
      </Row>
    );
  }
}

//Profile.defaultProps = {
//  self: {},
//};

const mapDispatchToProps = dispatch => ({
  fetchSelf: () => dispatch(membersOperations.fetchSelf()),
  fetchDetail: (id) => dispatch(membersOperations.fetchDetail(id)),
});

const mapStateToProps = ({ members: { members, }, }) => ({
  members,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
