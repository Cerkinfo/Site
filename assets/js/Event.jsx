const React = require('react');
const moment = require('moment');
require('./Event.scss');

/**
 * Timesheet Bubble
 */
class Event extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            checked: this.props.checked,
        };

        this.TimeLineLength = this.props.sectionDOM.offsetParent.offsetWidth;
        this.offset = this.props.sectionDOM.offsetLeft;
        this.SectionLength = this.props.sectionDOM.offsetWidth;

        this.handleClick = this.handleClick.bind(this);
    }

    /* @desc : Change the "checked" state of the component.
     */
    toggle(callback) {
        this.setState({
            checked: !this.state.checked,
        }, callback);
    }

    handleClick () {
        this.toggle(() => {
            if (this.state.checked) {
                this.props.parent.show(this);
            } else {
                this.props.parent.close();
            }
        });
    }

    /**
     * Calculate starting offset for bubble
     */
    _getStartOffset () {
        const copy = new moment(this.props.event.start);
        const startMonth = new moment(copy.startOf('month'));
        const endMonth = new moment(copy.endOf('month'));

        const monthLength = endMonth.diff(startMonth);

        const distanceFromMonthStart = this.props.event.start.diff(startMonth);

        // console.log('monthLength : ' + monthLength + '\ndistanceFromMonthStart : ' + distanceFromMonthStart);

        return this.offset + (this.SectionLength * (distanceFromMonthStart / monthLength));
    }

    /**
     * Get bubble's width in pixel
     */
    _getWidth () {
        // console.log('Width: ' + (this.TimeLineLength * (this.event.length / this.bounds.length)));
        return this.TimeLineLength * (this.props.event.length / this.props.bounds.length);
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
    sectionDOM: React.PropTypes.object.isRequired,
};

Event.defaultProps = {
    checked: false,
};

module.exports = Event;
