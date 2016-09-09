const React = require('react');
const moment = require('moment');
require('./Event.scss');

class Event extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            checked: this.props.checked,
            bounds: this.props.bounds,
            sectionDOM: this.props.sectionDOM,
            parentDOM: this.props.parentDOM,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        this.state = {
            checked: nextProps.checked,
            bounds: nextProps.bounds,
            sectionDOM: nextProps.sectionDOM,
            parentDOM: nextProps.parentDOM,
        };
    }

    handleClick () {
        if (this.state.checked) {
            this.props.parent.close();
        } else {
            this.props.parent.show(this);
        }
    }

    /**
     * Calculate starting offset for bubble
     */
    _getStartOffset () {
        if (!(this.state.sectionDOM && this.state.parentDOM)) {
            return 0;
        }

        const distanceFromBound = this.props.event.start.diff(this.state.bounds.low);
        const scaleToPixels = (distanceFromBound / this.state.bounds.length) * this.state.parentDOM.offsetWidth;
        console.log('hey : ' + scaleToPixels);

        return scaleToPixels;
    }

    /**
     * Get bubble's width in pixel
     */
    _getWidth () {
        if (!(this.state.sectionDOM && this.state.parentDOM)) {
            return 0; 
        }

        // console.log('Width: ' + (this.TimeLineLength * (this.event.length / this.bounds.length)));
        const TimeLineLength = this.state.sectionDOM.offsetParent.offsetWidth;
        return TimeLineLength * (this.props.event.length / this.props.bounds.length);
    }

    render () {
        const style = {
            marginLeft: this._getStartOffset() + 'px',
            width: this._getWidth() + 'px'
        };

        const duration = this.props.event.end - this.props.event.start;
        const summary = this.props.event.summary;

        return (
            <li className={this.state.checked ? 'checked' : 'unchecked'} onClick={this.handleClick}>
                <span style={style} className="bubble" data-duration={duration}></span>
                <span className="inline-date">
                    {this.props.event.start.format('DD/MM/YY')}
                </span>
                <span className="inline-summary">
                    {summary}
                </span>
            </li>
        );
    }
}

Event.propTypes = { 
    parent: React.PropTypes.object.isRequired,
    bounds: React.PropTypes.object.isRequired,
    checked: React.PropTypes.bool,
    event: React.PropTypes.object.isRequired,
    sectionDOM: React.PropTypes.object,
    parentDOM: React.PropTypes.object,
};

Event.defaultProps = {
    checked: false,
};

module.exports = Event;
