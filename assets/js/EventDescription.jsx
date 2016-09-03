const React = require('react');
const ReactMarkdown = require('react-markdown');
const Collapse = require('react-collapse');
const moment = require('moment');
require('./EventDescription.scss');

class EventDescription extends React.Component {
    constructor (props) {
        super(props);
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
        if (!this.props.event) {
            return (
                <Collapse className="event-info" isOpened={false}>
                </Collapse>
            );
        }

        return (
            <Collapse className="event-info" isOpened={true}>
                <div className="summary">
                    {this.props.event.summary}
                </div>
                <div className="date">
                    {this._formatDate()}
                </div>
                <div className="description">
                    <ReactMarkdown source={this.props.event.description}/>
                </div>
            </Collapse>
        );
    }
}

EventDescription.propTypes = { 
    event: React.PropTypes.object,
};

module.exports = EventDescription;
