import React from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import { Button, Icon, Input } from 'react-materialize';
import { Provider } from 'react-redux';
import { Form, Control } from 'react-redux-form';
import BuyerForm from './buyer/index.jsx';
import store from './store.js';

export default class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit (transaction) {
        console.log(JSON.stringify(transaction));
        axios.post('/fr/api/v1/transaction/', transaction, {
            headers: {
                'X-CSRFToken': cookie.load('csrftoken'),
            } 
        }).then(json => {
            console.log(JSON.stringify(json.data));
        });
    }

    render () {
        return (
            <Provider store={ store }>
                <Form
                    model='transaction'
                    onSubmit={ transaction => this.handleSubmit(transaction) }
                >
                    <h4>
                        <Icon>import_export</Icon>
                        Montant
                    </h4>
                    <Control
                        type='number'
                        step='0.01'
                        model='transaction.price'
                        component={ Input }
                        label='Montant'
                    />
                    <BuyerForm 
                        model='transaction.user'
                    />
                    <Button type='submit' waves='light'>
                        Envoyer
                        <Icon right>
                            send
                        </Icon>
                    </Button>
                </Form>
            </Provider>
        );
    }
}
