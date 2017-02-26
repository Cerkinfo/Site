const React =  require('react');

class QuantityForm extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            quantity: 1,
        };
    }

    bindState(property) {
        return (event) => { this.setState({ [property]: event.target.value }); };
    }

    render () {
        return (
            <div>
                <h4>
                    <i className="material-icons prefix">import_export</i>
                    Quantitée
                </h4>
                <label htmlFor="quantity"/>
                <input 
                    type="number"
                    name="quantity" 
                    id="quantity" 
                    value={this.state.quantity} 
                    onChange={this.bindState('quantity')}
                    className="validate"
                />
            </div>
        );
    }
}

module.exports = QuantityForm;
