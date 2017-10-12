import React from 'react';
import { connect } from 'react-redux';
// import { membersOperations } from '../ducks/members/';
import { CardTitle } from 'react-materialize';

class Avatar extends React.Component {
  render() {
    return (
      <div>
        <CardTitle reveal image={this.props.self.avatar} waves='light'/>
        <a href="" className="btn-floating btn halfway-fab waves-effect waves-light red">
          <i className="material-icons">mode_edit</i>
        </a>
      </div>
    );
  }
}

const mapStateToProps = ({ members: { self, }, }) => ({
  self,
});

const mapDispatchToProps = dispatch => ({
  // uploadPhoto: membersOperations.uploadhoto,
});

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
