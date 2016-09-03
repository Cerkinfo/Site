const React = require('react');
const ReactDOM = require('react-dom');
const ReactMarkdown = require('react-markdown');
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

    /**
     * Format the event date according to its duration.
     */
    _formatDate () {
        const event = this.props.event;
        if (event.end.diff(event.start) > moment.duration(1, 'days')) {
            return 'Le ' + event.start.format('DD MMMM') + ' de ' + event.start.format('HH:mm') + ' au ' + event.end.format('DD MMMM à HH:mm');
        } else {
            return 'Le ' + event.start.format('DD MMMM') + ' de ' + event.start.format('HH:mm') + ' à ' + event.end.format('HH:mm');
        }
    }

    render () {
        const style = {
            marginLeft: this._getStartOffset() + 'px',
            width: this._getWidth() + 'px'
        };

        const className = 'bubble bubble-' + (this.props.event.type || 'default');
        const duration = this.props.event.end - this.props.event.start;
        const summary = this.props.event.summary;

        return (
            <li onClick={this.handleClick}>
                <span style={style} className={className} data-duration={duration}></span>
                <span className="inline-date">
                    {this.props.event.start.format('DD/MM/YY')}
                </span>
                <span className="inline-summary">
                    {summary}
                </span>
                <Collapse className="event-info" isOpened={this.state.clicked}>
                    <div className="summary">
                        {summary}
                    </div>
                    <div className="date">
                        {this._formatDate()}
                    </div>
                    <div className="description">
                        <ReactMarkdown source={this.props.event.description}/>
                    </div>
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
