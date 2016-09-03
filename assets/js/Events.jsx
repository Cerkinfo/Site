const React = require('react');
const ReactDOM = require('react-dom');
const Event = require('./Event.jsx');
const EventDescription = require('./EventDescription.jsx');
const moment = require('moment');
require('./Events.scss');

class Events extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentSelected: null,
        };

        const raw = this._parse(this.props.data);
        this.data = raw.data || [];
        this.bounds = raw.bounds || [];

    }

    componentDidMount () {
        const result = [];

        const copy = new moment(this.bounds.low);
        for (let section = copy.startOf('month'); section.month() <= this.bounds.up.month(); section.add(1, 'M')) {
            result[this._getSectionID(section)] = ReactDOM.findDOMNode(this.refs[this._getSectionID(section)]);
        }

        this.setState({
            sectionsDOM: result,
        });
    }

    close () {
        this.setState({
            currentSelected: null,
        });
    }

    show (ReactEvent) {
        if (this.state.currentSelected 
            && this.state.currentSelected != ReactEvent
            && this.state.currentSelected.state.checked) 
        {
            console.log('toggling');
            this.state.currentSelected.toggle();
        }

        this.setState({
            currentSelected: ReactEvent,
        });
    }

    _getSectionID (section) {
        return 'event-unit-' + section.month()  + '-' + section.year();
    }

    _parse (data) {
        const now = new moment();
        let min = new moment();
        let max = new moment();

        let ret = [];

        for (let event of data) {
            var startFrom = new moment(event.begin);
            var finishOn = new moment(event.end);

            if (startFrom.isBefore(now)) {
                continue; 
            }

            // console.log('Min : ' + min.unix() + '\nMax : ' + max.unix() + '\nNew : [' + startFrom.unix() + ', ' + finishOn.unix() + ']');
            if (startFrom.isBefore(min)) {
                min = startFrom;
            }

            if (max.isBefore(finishOn)) {
                max = finishOn;
            }

            ret.push({
                start: startFrom, 
                end: finishOn, 
                length: finishOn.diff(startFrom),
                summary: event.summary,
                description: event.description,
            });
        }

        return {
            data: ret,
            bounds : {
                low: min,
                up: max,
                length: max.diff(min),
            }
        };
    }

    _buildSections (bounds) {
        const sections = [];
        const copy = new moment(bounds.low);
        for (let section = copy.startOf('month'); section.month() <= bounds.up.month(); section.add(1, 'M')) {
            sections.push(
                <section ref={this._getSectionID(section)}>
                    {section.format('MMMM')}
                </section>
            );
        }

        return sections; 
    }

    _getEvents () {
        const lists = [];
        const sectionsDOM = this.state && this.state.sectionsDOM;
        if(!sectionsDOM) return lists;

        for (let current of this.data) {
            lists.push(
                <Event 
                    parent={this}
                    bounds={this.bounds}
                    event={current} 
                    sectionDOM={sectionsDOM[this._getSectionID(current.start)]}
                />
            );

        }

        return lists;
    }

    render () {
        const className = this.props.className + " " + (this.props.theme || '');

        return (
            <div>
                <div className={className}>
                    <div className="scale">
                        {this._buildSections(this.bounds)}
                    </div>
                    <ul className="data">
                        {this._getEvents()}
                    </ul>
                </div>
                <EventDescription event={this.state.currentSelected ? this.state.currentSelected.props.event : null}/>
            </div>
        );
    }
}

Events.propTypes = { 
    data: React.PropTypes.array.isRequired,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    theme: React.PropTypes.string
};

Events.defaultProps = {
    className: 'timesheet'
};

module.exports = Events;
