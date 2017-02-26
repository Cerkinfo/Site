const React = require('react')
const ProductForm = require('./product/index.jsx');
const QuantityForm = require('./quantity/index.jsx');
const BuyerForm = require('./buyer/index.jsx');

class Form extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <ProductForm/>
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
