import React from 'react';
import Avatar from './Avatar';
import { connect } from 'react-redux';
import { membersOperations } from '../ducks/members/';
import { Row, Col, Card, } from 'react-materialize';

class Profile extends React.Component {
  componentWillMount() {
    this.props.fetchSelf();
  }

  isSelf () {
  }

  render() {
    if (!this.props.self.hasOwnProperty("id")) {
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
                { this.props.self.first_name && this.props.self.last_name
                  ? `${this.props.self.first_name} ${this.props.self.last_name}`
                  : this.props.self.username
                }
              </span>
            }
            reveal={
              <div>
                <span className="card-title grey-text text-darken-4">Surnoms<i className="material-icons right">close</i></span>
                {this.props.self.surnames.map(x => (<p key={x} className="grey-text text-darken-4">{x}</p>))}
              </div>
            }
          >
            <p className="grey-text text-darken-4">
                {this.props.self.birthdate}
            </p>
            { this.props.self.hasOwnProperty('ardoise') ?
              <p className="grey-text text-darken-4">
                Ardoise: {this.props.self.balance} €
              </p>
            : null}
            { this.props.self ? (
              <div className="card-action">
                <a className="waves-effect waves-light btn" href="#barcode_modal">Carte membre</a>
              </div>
            ) : null }
          </Card>
        </Col>
        <Col s={2} m={2} l={1}/>
        <Col s={12} m={12} l={6}>
          <div className="career">
            <h2>Comités de Cercle</h2>
            <ul>
              {this.props.self.memberships.map(x => x.postes.filter(x => x.is_bapteme).map(x => <div>{x.name}<br/></div>))}
            </ul>

            <div className="divider"></div>

            <h2>Parcours Folklorique</h2>
            <ul>
              {this.props.self.memberships.map(x => x.postes.filter(x => !x.is_bapteme).map(x => <div>{x.name}<br/></div>))}
            </ul>
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
  fetchDetail: () => dispatch(membersOperations.fetchDetail()),
});

const mapStateToProps = ({ members: { self, }, }) => ({
  self,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
