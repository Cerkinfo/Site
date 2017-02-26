const React = require('react')
const QuantityForm = require('./quantity/index.jsx');
const BuyerForm = require('./buyer/index.jsx');

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <QuantityForm/>
                <BuyerForm/>
                <button className="waves-effect waves-light btn" type="submit" name="action">
                    Envoyer
                    <i className="material-icons right">
                        send
                    </i>
                </button>
            </div>
        );
    }
}

module.exports = Form
