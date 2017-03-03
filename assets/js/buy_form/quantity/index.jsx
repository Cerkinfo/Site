import React from 'react';
import { Input, Icon } from 'react-materialize';
import { Control } from 'react-redux-form';

export default class QuantityForm extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <h4>
                    <Icon>import_export</Icon>
                    Quantitée
                </h4>
                <Control
                    type="number"
                    model=".quantity" 
                    component={Input} 
                />
            </div>
        );
    }
}
