import React from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { Input } from 'react-materialize';

class Quantity extends React.Component {
    static propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        model: React.PropTypes.string.isRequired,
    }

    constructor (props) {
        super(props);

        this.alterQuantity = this.alterQuantity.bind(this);
    }

    alterQuantity (event) {
        const { dispatch, model } = this.props;

        let value = event.target.value;    
        if (value > 0) {
            value = -value;        
        }

        dispatch(actions.change(model, value));
    }

    render () {
        const self = this;
        return (
            <Input
                type='number'
                step='0.01'
                onChange={self.alterQuantity}
                label='Montant'
            />
        );
    }
}

export default connect()(Quantity);
