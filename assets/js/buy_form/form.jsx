const React = require('react')
const BuyerForm = require('./buyer/index.jsx');
const ProductForm = require('./product/index.jsx');

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <ProductForm/>
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
