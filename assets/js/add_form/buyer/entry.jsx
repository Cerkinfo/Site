import React from 'react';
import { connect } from 'react-redux';
import { Row, Input, Collection, CollectionItem } from 'react-materialize';
import { actions } from 'react-redux-form';
import ReactSelectize from 'react-selectize';
const SimpleSelect = ReactSelectize.SimpleSelect;
import axios from 'axios';
import store from '../store.js';

class Entry extends React.Component {
    static propTypes: {
        barcode: React.PropTypes.object,
    }

    static defaultProps: {
        barcode: [],
    }

    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };

        this.searchMember = this.searchMember.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.barcode) {
            this.setState({
                users: [nextProps.barcode],
            });
        }
    }

    searchMember (search) {
        if (search.length > 2) {
            axios.get('/api/v1/member?search=' + search)
                .then(json => {
                    this.setState({
                        users: json.data,
                    });
                });
        } else {
            this.setState({
                users: [],    
            });
        }
    }

    render () {
        const { model, dispatch } = this.props;

        const options = this.state.users.map(user => {
            if (user.user) {
                return {label: user.user.username, value: user.id};
            } else {
                return {label: user.id, value: user.id};
            }
        });

        return (
            <SimpleSelect
                name="user"
                options={options}
                placeholder = {this.loading ? "Choisir l'utilisateur" : "Chargement..."}                                                                        
                theme = "material"
                transitionEnter = {true}
                onSearchChange = {this.searchMember}
                onValueChange = {e => dispatch(actions.change(model, e.value))}
            />
        );
    }
}

export default connect()(Entry)
