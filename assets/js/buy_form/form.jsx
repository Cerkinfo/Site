import React from 'react';
import { Form } from 'react-redux-form';
import { Provider } from 'react-redux';
import { Button, Icon, CardPanel } from 'react-materialize';
import cookie from 'react-cookie';
import axios from 'axios';
import ProductForm from './product/index.jsx';
import QuantityForm from './quantity/index.jsx';
import BuyerForm from './buyer/index.jsx';
import store from './store.js';

export default class TransactionForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            errors: [],
        };
    }

    handleSubmit (transaction) {
        axios.post('/api/v1/transaction/', transaction, {
            headers: {
                'X-CSRFToken': cookie.load('csrftoken'),
            },
        }).then(json => {
            const r = json.data;
            this.setState({
                messages: [
                    `Achat de ${r.quantity} ${r.comment} à ${Math.abs(r.price)}€ effectué avec succès.`
                ],
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
                <Form model="transaction" onSubmit={t => this.handleSubmit(t)}>
                    {this.renderMessages()}
                    {this.renderErrors()}
                    <ProductForm/>
                    <QuantityForm/>
                    <BuyerForm model='transaction.user'/>
                    <Button type="submit">
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
