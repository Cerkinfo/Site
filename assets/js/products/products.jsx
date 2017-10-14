import React from 'react';
import cookie from 'react-cookie';
import { Provider } from 'react-redux';
import { Form, Control, actions, Row } from 'react-redux-form';
import { Modal, Input, Button, Collection, CollectionItem, Icon } from 'react-materialize';
import axios from 'axios';
import store from './store.js';

export default class Products extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            products: [],
        };
    }

    componentDidMount () {
        axios.get('/api/v1/product/')
            .then(json => {
                this.setState({products: json.data});
            });
    }

    handleSubmit (product) {
        axios.post('/api/v1/product/', product, {
            headers: {
                'X-CSRFToken': cookie.load('csrftoken'),
            }
        }).then(json => {
            if (json.data.error) {

            } else {
                const tmp = this.state.products;
                tmp.push(json.data);
                this.setState({
                    products: tmp,
                });
            }
        });
    }

    render_products () {
        const style = {
            color: 'grey',
        };

        return this.state.products.map(x => {
            return (
                <CollectionItem key={x.id}>
                    <span className="title">{x.name} </span>
                    <span style={style}>({x.price} €)</span>

                    <a href={'/fr/coma/product/delete/' + x.id} className='right'>
                        <i className='material-icons'>delete</i>
                    </a>
                </CollectionItem>
            );
        });
    }

    render () {
        return (
            <div>
                <Collection>
                    {this.render_products()}
                </Collection>
                <Modal
                    header='Ajouter un produit à vendre.'
                    actions={null}
                    trigger={
                        <Button floating large className='red' waves='light' icon='add'/>
                    }
                >
                    <Provider store={ store }>
                        <Form
                            model='product'
                            onSubmit={product => this.handleSubmit(product)}
                        >
                            <Control.text
                                model='product.name'
                                component={Input}
                                label='Nom du produit'
                            />
                            <Control
                                type='number'
                                step='0.01'
                                model='product.price'
                                component={Input}
                                label='Prix du produit'
                            />
                            <Button type='submit' modal='close' waves='light'>Envoyer <Icon right>send</Icon></Button>
                        </Form>
                    </Provider>
                </Modal>
            </div>
        );
    }
}
