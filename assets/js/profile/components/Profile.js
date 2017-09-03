import React from 'react';
import Avatar from './Avatar';
import { connect } from 'react-redux';
import { membersOperations } from '../ducks/members/';
import { Row, Col, Card, } from 'react-materialize';

class Profile extends React.Component {
  componentWillMount() {
    this.props.fetchSelf();
  }

  render() {
    return null;
    // return (
    //   <Row className="profile_content">
    //     <Col s={2} m={2} l={12}/>
    //     <Col s={8} m={8} l={4}>
    //       <Card
    //         header={<Avatar/>}
    //         title={
    //           <span className="grey-text text-darken-4">
    //             { this.props.me.first_name && this.props.me.last_name
    //               ? `${this.props.me.first_name} ${this.props.me.last_name}`
    //               : this.props.username
    //             }
    //           </span>
    //         }
    //         reveal={
    //           <div>
    //             <span className="card-title grey-text text-darken-4">Surnoms<i className="material-icons right">close</i></span>
    //             {this.props.me.surnames.map(x => (<p key={x} className="grey-text text-darken-4">{x}</p>))}
    //           </div>
    //         }
    //       >
    //         <p className="grey-text text-darken-4">
    //             {this.props.me.birthdate}
    //         </p>
    //         <p className="grey-text text-darken-4">
    //             Ardoise: {this.props.me.balance} €
    //         </p>
    //         { this.props.me ? (
    //           <div className="card-action">
    //               <a className="waves-effect waves-light btn" href="#barcode_modal">Carte membre</a>
    //           </div>
    //         ) : null }
    //       </Card>
    //     </Col>
    //     <Col s={2} m={2} l={1}/>
    //     <Col s={12} m={12} l={6}>
    //       <div className="career">
    //         <h2>Comités de Cercle</h2>
    //         <ul>
    //           {this.props.me.memberships.map(x => x.postes)}
    //         </ul>

    //         <div className="divider"></div>

    //         <h2>Parcours Folklorique</h2>
    //         <ul>
    //           {this.props.me.memberships.map(x => x.postes)}
    //         </ul>
    //       </div>

    //       <div className="divider"></div>
    //     </Col>
    //     <Col s={12} m={12} l={1}/>
    //   </Row>
    // );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSelf: dispatch(membersOperations.fetchSelf),
  fetchDetail: dispatch(membersOperations.fetchDetail),
});

const mapStateToProps = ({ self, }) => ({
  self,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
