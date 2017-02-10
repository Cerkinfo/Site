const React = require('react');
const axios = require('axios')
const AddProductModal = require('./products_modal.jsx');

class Products extends React.Component {
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
                <li className="collection-item">
                    <span className="title">{x.name} </span>
                    <span style={style}>({x.price} €)</span>

                    <a href={"/fr/coma/product/delete/" + x.id} className="right">
                        <i className="material-icons">delete</i>
                    </a>
                </li>
            );
        });

        return (
            <div>
                <ul className="collection"> 
                    {products}
                </ul> 
                <AddProductModal/>
                <a href="#add_product_modal" className="btn-floating btn-large waves-effect waves-light red">
                    <i className="material-icons">add</i>
                </a>
            </div>
        );
    }
}

module.exports = Products;
