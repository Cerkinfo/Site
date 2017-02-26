const React = require('react');
const ReactSelectize = require("react-selectize");
const SimpleSelect = ReactSelectize.SimpleSelect;
const axios = require('axios');
require('./material.scss');

class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [], 
        };
        this.onValueChange = this.onValueChange.bind(this);
    }

    componentDidMount () {
        axios.get('/fr/api/v1/product/') 
            .then(json => {
                this.setState({
                    products: json.data,
                });
            });
    }

    onValueChange (obj) {
        this.props.onValueChange(obj.value);
    }

    render () {
        const options = this.state.products.map(p => {
            return {label: String(p.name + ": " + p.price + " €"), value: p}
        });

        return (
            <div>
                <SimpleSelect 
                    options = {options} 
                    placeholder = {this.state.products.length ? "Choisir le produit" : "Chargement..."}
                    theme = "material"
                    transitionEnter = {true}
                    onValueChange = {this.onValueChange}
                />
            </div>
        );
    }
}

Select.propTypes = {
    onValueChange: React.PropTypes.func.isRequired,
};

module.exports = Select;
