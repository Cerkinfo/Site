import React from 'react';
import Quagga from 'quagga';

export default class Scanner extends React.Component {
    static propTypes: {
        onDetected: React.PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
    }

    _onDetected(result) {
        this.props.onDetected(result);
    }

    componentDidMount() {
        Quagga.init({
            inputStream: {
                type : "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facing: "environment"
                }
            },
            locator: {
                patchSize: "medium",
                halfSample: true
            },
            numOfWorkers: 2,
            decoder: {
                readers : ["code_128_reader"]
            },
            locate: true
        }, (err) => {
            if (err) {
                return console.log(err);
            }
            Quagga.start();
        });
        Quagga.onDetected(this._onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    render () {
        return (
            <div id="interactive" className="viewport"/>
        ) 
    }
}
