import React from 'react';
import cookie from 'react-cookie';
import axios from 'axios';
import { Button, Icon, Input, CardPanel } from 'react-materialize';
import { Provider } from 'react-redux';
import { Form, Control } from 'react-redux-form';
import BuyerForm from './buyer/index.jsx';
import Quantity from './quantity.jsx';
import store from './store.js';

export default class Container extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            errors: [],
        };
    }

    handleSubmit (transaction) {
        axios.post('/fr/api/v1/transaction/', transaction, {
            headers: {
                'X-CSRFToken': cookie.load('csrftoken'),
            } 
        }).then(json => {
            // TODO Reset state
            const r = json.data;
            this.setState({
                messages: [
                    `Versement de ${Math.abs(r.price)}€ effectué avec succès.`
                ]
                errors: [],
            });
        }).catch(error => {
            if (error.response) {
                console.log(error.response.data);
                this.setState({
                    messages: [],
                    errors: error.response.data,
                });
            } else {
                console.log('Error', error.message);
                this.setState({
                    messages: [],
                    errors: [error.message],
                });
            }
            console.log(error.config);
        });
    }

    renderMessages () {
        const result = [];
        for(let key in this.state.messages) {
            result.push(
                <CardPanel className="green darken-1 black-text">
                    {key}: {this.state.messages[key]}
                </CardPanel>
            );
        } 
        return result;
    }

    renderErrors () {
        const result = [];
        for(let key in this.state.errors) {
            result.push(
                <CardPanel className="red darken-1 black-text">
                    {key}: {this.state.errors[key]}
                </CardPanel>
            );
        } 
        return result;
    }

    render () {
        return (
            <Provider store={ store }>
                <Form
                    model='transaction'
                    onSubmit={ transaction => this.handleSubmit(transaction) }
                >
                    {this.renderMessages()}
                    {this.renderErrors()}

                    <h4>
                        <Icon>import_export</Icon>
                        Montant
                    </h4>
                    <Quantity model='transaction.price'/>
                    <BuyerForm model='transaction.user'/>
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
