const React = require('react');
const Collapse = require('react-collapse');
require('./SpaceAPIPin.scss');

class SpaceAPIPin extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      url: this.props.url,
      api: null,
      checked: false,
    };

    this.download(this.state.url);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState({
      checked: !(this.state.checked),
    });
  }

  download (link) {
    fetch(link).then((res) => {
      console.log(res.url);
      if (res.status !== 200) {  
        throw ('Wrong Status Code: ' + res.status);  
      }

      return res.json();
    }).then(json => {
      this.setState({
        api: json,
      });
    }).catch(err => {
      console.log(err);
    });
  } 

  _formatDate (open, date) {
    const format = date.getDate() + '/' + date.getMonth() + ' ' + date.getHours() + 'h';
    return (open ? 'Ouvert' : 'Fermé') + ' depuis ' + format + '.';
  }

  render() {
    const api = this.state.api;
    if (!api) {
      return null;    
    }

    const style = {
      left: this.props.offsetLeft + 'px',
      top: this.props.offsetTop + 'px',
    };

    const open = api.state.open;
    const date = new Date(api.state.lastchange * 1000);
    const colorStyle = {
      color: open ? "green" : "red",
    };

    return (
      <div style={ style } className="space-state">
        <div onClick={this.handleClick} className={"space-state-box " + (this.state.checked ? 'checked' : 'unchecked')}>
          <b style={ colorStyle }>●</b> { open ? "Ouvert" : "Fermé" }
          <Collapse isOpened={ this.state.checked }>
            <div className="space-status">
              {this._formatDate(open, date)}
            </div>
          </Collapse>

        </div>
      </div>
    );
  }
}

SpaceAPIPin.propTypes = {
  url: React.PropTypes.string.isRequired,
  offsetLeft: React.PropTypes.number,
  offsetTop: React.PropTypes.number,
};

SpaceAPIPin.defaultProps = {
  offsetLeft: 0,
  offsetTop: 0,
};

module.exports.SpaceAPIPin = SpaceAPIPin;
