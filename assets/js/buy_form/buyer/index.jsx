const React = require('react');
const Scanner = require('./scanner');
const Entry = require('./entry');

class BuyerForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            barcode: null, 
            scanner: false,

        };

        this.toggleScanner = this.toggleScanner.bind(this);
        this.barcodeScanned = this.barcodeScanned.bind(this);
    }

    barcodeScanned (barcode) {
        this.setState({
            barcode: barcode,
        });
    }

    toggleScanner () {
         this.setState({
            scanner: !(this.state.scanner),
        });
    }

    render () {
        return (
            <div>
                <div className="row">
                    <div className="col s9">
                        <Entry barcode={this.state.barcode}/>
                    </div>
                    <div className="col s3">
                        <a
                            onClick={this.toggleScanner} 
                            className="waves-effect waves-light btn"
                        >
                            Scanner
                        </a>

                    </div>
                </div>
                {this.state.scanner ? <Scanner onDetected={this.barcodeScanned}/> : null}
            </div>
        );
    }
}

module.exports = BuyerForm;
