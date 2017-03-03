import React from 'react';
import Center from 'react-center';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Preloader } from 'react-materialize';

export default class Page extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            content: '',
        };
    }

    componentWillMount () {
        axios.get(this.props.url)
            .then(x => this.setState({content: x.data}))
            .catch(x => console.log(x))
    }

    render () {
        return this.state.content
            ? <ReactMarkdown source={this.state.content}/>
            : <Center><Preloader size='big'/></Center>;
    }
}
