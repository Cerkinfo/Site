const React = require('react');
const ReactDOM = require('react-dom');
const Collapse = require('react-collapse');
const moment = require('moment');

/**
 * Timesheet Bubble
 */
class Event extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            clicked: false,
        };

        this.TimeLineLength = this.props.sectionDOM.offsetParent.offsetWidth;
        this.offset = this.props.sectionDOM.offsetLeft;
        this.SectionLength = this.props.sectionDOM.offsetWidth;

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            clicked: !this.state.clicked,
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

        const className = 'bubble bubble-' + (this.props.event.type || 'default');
        const duration = this.props.event.end - this.props.event.start;
        const date = this.props.event.start.format('DD/MM/YY');
        const label = this.props.event.summary;

        return (
            <li onClick={this.handleClick}>
                <span style={style} className={className} data-duration={duration}></span>
                <span className="date">
                    {date}
                </span>
                <span className="label">
                    {label}
                </span>
                <Collapse isOpened={this.state.clicked}>
                    {this.props.event.description}
                </Collapse>
            </li>
        );
    }
}

Event.propTypes = { 
    bounds: React.PropTypes.object.isRequired,
    event: React.PropTypes.object.isRequired,
    sectionDOM: React.PropTypes.object.isRequired,
};

module.exports = Event;
