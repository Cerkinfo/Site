import React from 'react';
import axios from 'axios';
import { Modal, Button, Collection, CollectionItem } from 'react-materialize';

export default class Products extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            products: [],
        };
    }

    componentDidMount () {
        axios.get('/fr/api/v1/product/')
            .then(json => {
                this.setState({products: json.data});
            });
    }

    render () {
        const style = {
            color: 'grey', 
        };

        const products = this.state.products.map(x => {
            return (
                <CollectionItem>
                    <span className="title">{x.name} </span>
                    <span style={style}>({x.price} €)</span>

                    <a href={"/fr/coma/product/delete/" + x.id} className="right">
                        <i className="material-icons">delete</i>
                    </a>
                </CollectionItem>
            );
        });

        return (
            <div>
                <Collection>
                    {products}
                </Collection> 
                <Modal
                    header='Ajouter un produit à vendre.'
                    fixedFooter
                    trigger={
                        <Button floating large className='red' waves='light' icon='add'/>
                    }
                >
                    <p>
                        <div className="input-field">
                            <input name="name" id="name" type="text" className="validate"/>
                            <label htmlFor="name">Nom du produit</label>
                        </div>

                        <div className="input-field">
                            <input name="price" id="price" type="number" className="validate"/>
                            <label htmlFor="price">Prix du produit</label>
                        </div>
                    </p>
                </Modal>
            </div>
        );
    }
}
