const React = require('react');
const ReactMarkdown = require('react-markdown');
const Collapse = require('react-collapse');
const moment = require('moment');
const style = require('./EventDescription.scss');
const CalIcon = require('react-icons/lib/fa/calendar');
const FacebookIcon = require('react-icons/lib/fa/facebook-official');

class EventDescription extends React.Component {
    constructor (props) {
        super(props);
    }

    /**
     * Format the event date according to its duration.
     */
    _formatDate () {
        const event = this.props.event.props.event;
        if (event.end.diff(event.start) > moment.duration(1, 'days')) {
            return 'Le ' + event.start.format('DD MMMM') + ' de ' + event.start.format('HH:mm') + ' au ' + event.end.format('DD MMMM à HH:mm');
        } else {
            return 'Le ' + event.start.format('DD MMMM') + ' de ' + event.start.format('HH:mm') + ' à ' + event.end.format('HH:mm');
        }
    }


    _formatText (text) {
        const facebookEventRegex = /(\b(https?|http):\/\/www.facebook.com\/event\/[-A-Z0-9+&@#\/%=~_|]*)/ig;
        const urlRegex = /(\b(https?|http|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        const pictureRegex = /(\b(https?|http|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]).(?:jpg|gif|png)/ig;

        const facebookEvent = text.match(facebookEventRegex) || [];
        for (let url of facebookEvent) {
           text = text.replace(url, '');
        }

        // const urls = text.match(urlRegex) || [];
        // const pictures = text.match(pictureRegex) || [];
        // for (let url of urls) {
        //     if (pictures.indexOf(url) === -1) {
        //        text = text.replace(url, '[' + url + '](' + url + ')'); 
        //     } else {
        //        text = text.replace(url, '![' + url + '](' + url + ')'); 
        //     }
        // }

        return {
            facebook: facebookEvent,
            text: text,
        };
    } 

     _buildFacebook (eventLinks) {
         const result = [];
         for (let url of eventLinks) {
             result.push(
                <a href={url}>
                    <FacebookIcon />
                </a>
             );
         }

         return (
             <span className="facebook">
                {result}
             </span>
         
         );
     }

    render () {
        const event = this.props.event ? this.props.event.props.event : null;
        if (!event) {
            return (
                <Collapse isOpened={false}>
                </Collapse>
            );
        }

        const formatted = this._formatText(event.description);

        console.log(JSON.stringify(formatted));

        return (
            <Collapse className="event-info" isOpened={this.props.checked}>
                <div className="summary">
                    {event.summary}
                </div>
                <div className="date">
                    <CalIcon />
                    <span className="text">
                        {this._formatDate()}
                    </span>
                    {this._buildFacebook(formatted.facebook)}
                </div>
                <div className="description">
                    <ReactMarkdown source={formatted.text}/>
                </div>
            </Collapse>
        );
    }
}

EventDescription.propTypes = { 
    event: React.PropTypes.object.isRequired,
    checked: React.PropTypes.bool,
};

module.exports = EventDescription;
