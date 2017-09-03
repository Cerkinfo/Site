import React from 'react';
import { connect } from 'react-redux';
// import { membersOperations } from '../ducks/members/';
import { CardTitle } from 'react-materialize';

class Avatar extends React.components {
  render() {
    return (
      <div>
        <CardTitle reveal image={this.props.me.avatar} waves='light'/>
        { this.props.me ? (
            <a href="{% url 'user_edit' %}" className="btn-floating btn halfway-fab waves-effect waves-light red">
                <i className="material-icons">mode_edit</i>
            </a>
        ) : null }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({

});

const mapDispatchToProps = dispatch => ({
  // uploadPhoto: membersOperations.uploadhoto,
});

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);
