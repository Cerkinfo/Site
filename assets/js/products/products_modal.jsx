const React = require('react');

class AddProductModal extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        $('.modal').modal();
    }

    render () {
        return (
            <div id="add_product_modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h4>Ajouter un produit à vendre.</h4>
                    
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
                </div>
                <div className="modal-footer">
                    <button className="modal-action modal-close waves-effect waves-light btn-flat" type="submit" name="action">
                        Ajouter
                        <i className="material-icons right">
                            send
                        </i>
                    </button>
                </div>
            </div>
        );
    }
}

module.exports = AddProductModal;
