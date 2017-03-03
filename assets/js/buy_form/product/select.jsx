import React from 'react';
import ReactSelectize from "react-selectize";
const SimpleSelect = ReactSelectize.SimpleSelect;
import axios from 'axios';

export default class Select extends React.Component {
    static propTypes: {
        onValueChange: React.PropTypes.func.isRequired,
    }

    constructor (props) {
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
                    onValueChange = {x => this.props.onValueChange(x.value)}
                />
            </div>
        );
    }
}
