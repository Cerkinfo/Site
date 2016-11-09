const React = require('react');
const ReactMarkdown = require('react-markdown');
const Collapse = require('react-collapse');
const moment = require('moment');
const style = require('./EventDescription.scss');
const CalIcon = require('react-icons/lib/fa/calendar');
const FacebookIcon = require('react-icons/lib/fa/facebook-official');
const LinkIcon = require('react-icons/lib/fa/external-link');

class EventDescription extends React.Component {
    constructor (props) {
        super(props);
    }

    /**
     * @desc: Format the event date according to its duration.
     */
    _formatDate () {
        const event = this.props.event.props.event;
        if (event.end.diff(event.start) > moment.duration(1, 'days')) {
            return 'Le ' + event.start.format('DD MMMM') + ' de ' + event.start.format('HH:mm') + ' au ' + event.end.format('DD MMMM à HH:mm');
        } else {
            return 'Le ' + event.start.format('DD MMMM') + ' de ' + event.start.format('HH:mm') + ' à ' + event.end.format('HH:mm');
        }
    }

    /**
     * @desc: 
     */
    _formatGeo() {

    }

    /* @desc : Find facebook link in a chunk of text.
     */
    _formatText (text) {
        if (!text) {
            return {
                facebook: [],
                text: '',
            };
        }

        const facebookEventRegex = /(\b(https?|http):\/\/www.facebook.com\/event\/[-A-Z0-9+&@#\/%=~_|]*)/ig;
        // const urlRegex = /(\b(https?|http|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        // const pictureRegex = /(\b(https?|http|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]).(?:jpg|gif|png)/ig;

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

    _isFacebookLink (url) {
        const facebookEventRegex = /(\b(https?|http):\/\/www.facebook.com\/event\/[-A-Z0-9+&@#\/%=~_|]*)/ig;

        return url.match(facebookEventRegex) || [];
    }

    _buildExternalLink (eventLinks, icon) {
        const result = [];
        eventLinks = Array(eventLinks)
        for (let url of eventLinks) {
            result.push(
               <a href={url}>
                {icon}
                <LinkIcon/>
               </a>
            );
        }

        return (
            <span className="extern">
               {result}
            </span>
        
        );
    }

    render () {
        const event = this.props.event && this.props.event.props.event;
        if (!event) {
            return (
                <Collapse isOpened={false}>
                </Collapse>
            );
        }

        let externLink = null;
        if (event.url) {

            // Event with url of the origin, facebook or google depending on
            // the creation origin.
            if (this._isFacebookLink(event.url)) {
                externLink = this._buildExternalLink(event.url, FacebookIcon);
            } else {
                externLink = this._buildExternalLink(event.url, LinkIcon);
            }
        }
        
        return (
            <Collapse className="event-info" isOpened={this.props.checked}>
                <div className="summary">
                    {event.summary}
                </div>
                <div className="highlights">
                    <span className="date">
                        <CalIcon />
                        {this._formatDate()}
                    </span>
                    <span className="location">
                        {this._formatGeo()}
                    </span>
                    {externLink}
                </div>
                <div className="description">
                    <ReactMarkdown source={event.description}/>
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
