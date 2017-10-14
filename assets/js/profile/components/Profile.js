import React from 'react';
import AsideInfo from './AsideInfo';
import YearList from './YearList';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { membersOperations } from '../ducks/members/';
import { Row, Col, Card, } from 'react-materialize';

class Profile extends React.Component {
  componentWillMount() {
    this.props.fetchSelf();
    this.props.fetchDetail(this.props.match.params.id);
  }

  getBapteme(current) {
    return _.flatten(
      current.memberships.map(
        x => x.postes.filter(x => !x.is_bapteme).map(
          y => ({
            ...y,
            start: x.year.start,
            stop: x.year.stop,
          })
        )
      )
    );
  }

  getPoste(current) {
    return _.flatten(
      current.memberships.map(
        x => x.postes.filter(x => x.is_bapteme).map(
          y => ({
            ...y,
            start: x.year.start,
            stop: x.year.stop,
          })
        )
      )
    );
  }

  isSelf(current) {
    if (!this.props.self.hasOwnProperty('id')) {
        return false;
    }

    return this.props.self.id === current.id;
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
          <AsideInfo infos={current} isSelf={true}/>
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

const mapStateToProps = ({ members: { members, self, }, }) => ({
  members,
  self,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));
