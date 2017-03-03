import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Icon } from 'react-materialize';
import { Control, actions } from 'react-redux-form';
import Select from './select.jsx';


class ProductForm extends React.Component {
    static propTypes: {
        dispatch: React.PropTypes.func.isRequired,    
    }

    constructor(props) {
        super(props);

        this.state = {
            showDetails: false,
        };

        this.toggleProductDetails = this.toggleProductDetails.bind(this);
        this.newProductValue = this.newProductValue.bind(this);
    }

    toggleProductDetails () {
        this.setState({
            showDetails: !(this.state.showDetails),
        });
    }

    newProductValue (product) {
        const { dispatch } = this.props;
        dispatch(actions.change('transaction.comment', product.name));
        dispatch(actions.change('transaction.price', product.price));
    }

    render () {
        const styleDisplay = {
            display: this.state.showDetails ? 'block' : 'none',
        };

        return (
            <div>
                <h4>
                    <Icon>shopping_cart</Icon>
                    Produit
                </h4>
                <Row>
                    <Col s={4}>
                        <Select onValueChange={this.newProductValue}/>
                    </Col>
                    <Col s={2}>
                        <a onClick={this.toggleProductDetails} className="waves-effect waves-light btn">
                            <Icon>settings</Icon>
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Control.text 
                        getRef={node => this.comment = node}
                        style={styleDisplay} 
                        component={Input} 
                        model=".comment"
                    />
                    <Control 
                        getRef={node => this.price = node}
                        style={styleDisplay} 
                        type="number" 
                        step="0.01" 
                        component={Input} 
                        model=".price"
                    />
                </Row>
            </div>
        );
    }
}

export default connect()(ProductForm)
