const React = require('react');

class Entry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value, 
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        console.log(e.target.value);
        this.setState({
            value: e.target.value, 
        });
    }

    render () {
        return (
            <div className="input-field">
                <i className="material-icons prefix">account_circle</i>
                <input name="user" id="id_user" type="text" onChange={this.handleChange} value={this.state.value} className="validate"/>
                <label htmlFor="id_user">
                    { "Nom d'utilisateur" }
                </label>
            </div> 
        );
    }
}

Entry.propTypes = {
    value: React.PropTypes.string,
};

module.exports = Entry;
