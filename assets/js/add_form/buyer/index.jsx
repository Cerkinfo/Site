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
        axios.get('/fr/api/v1/check_membership/' + barcode)
            .then(json => {
                if (Array.isArray(json) && json.length == 1) {
                    this.setState({barcode: json[0]});
                }
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
                    <h4>
                        <i className="material-icons prefix">account_circle</i>
                        Acheteur
                    </h4>
                </div>
                <div className="row">
                    <div className="col s4">
                        <Entry barcode={this.state.barcode}/>
                    </div>
                    <div className="col s3">
                        <a onClick={this.toggleScanner} className="waves-effect waves-light btn">
                            Scanner
                            <i className="material-icons right">
                                {this.state.scanner ? "videocam_off" : "videocam"}
                            </i>
                        </a>

                    </div>
                </div>
                {this.state.scanner ? <Scanner users={this.state.barcode} onDetected={this.barcodeScanned}/> : null}
            </div>
        );
    }
}

module.exports = BuyerForm;
