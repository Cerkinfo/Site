const React = require('react');
const Select = require('./select.jsx');

class ProductForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            price: null, 
            quantity: 1,
            showDetails: false,
        };

        this.changeValue = this.changeValue.bind(this);
        this.toggleProductDetails = this.toggleProductDetails.bind(this);
    }

    changeValue (product) {
        this.setState({
            name: product.name,
            price: product.price,
        });
    }

    toggleProductDetails () {
        console.log(this.state.showDetails);
        this.setState({
            showDetails: !(this.state.showDetails),
        });
    }

    render () {
        const styleDisplay = {
            display: this.state.showDetails ? 'block' : 'none',
        };

        return (
            <div>
                <div className="row">
                    <div className="col s4">
                        <Select onValueChange={this.changeValue}/>
                    </div>
                    <div className="col s2">
                        <a onClick={this.toggleProductDetails} className="waves-effect waves-light btn">
                            <i className="material-icons">settings</i>
                        </a>
                    </div>
                    <div className="input-field col s6">
                        <input name="quantity" id="id_quantity" type="number" className="validate"/>
                        <label htmlFor="id_quantity">Quantitée</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input style={styleDisplay} value={this.state.name} name="comment" id="comment" type="text" className="validate"/>
                        <label style={styleDisplay} htmlFor="comment">Produit</label>
                    </div>
                    <div className="input-field col s6">
                        <input style={styleDisplay} value={this.state.price} name="price" id="price" type="number" className="validate"/>
                        <label style={styleDisplay} htmlFor="price">Prix</label>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = ProductForm;
