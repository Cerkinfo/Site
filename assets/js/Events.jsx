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
            checked: false,
            currentSelected: null,
            sectionsDOM: null,
        };

        const raw = this._parse(this.props.data);
        this.data = raw.data || [];
        this.bounds = raw.bounds || [];
        this.reactEvent = [];
    }

    componentDidMount () {
        const result = {};

        const copy = new moment(this.bounds.low);
        for (let section = copy.startOf('month'); section.month() <= this.bounds.up.month(); section.add(1, 'M')) {
            result[this._getSectionID(section)] = ReactDOM.findDOMNode(this.refs[this._getSectionID(section)]);
        }

        this.setState({
            sectionsDOM: result,
        });
    }

    /* @desc : Close the <EventDescription/>.
     */
    close () {
        this.setState({
            checked: false,
        });
    }

    /* @desc : Show the description from an event in the <EventDescription/>
     *      component.
     *
     * @param {ReactEvent} : <Event/> component to show in <EventDescription/>.
     */
    show (ReactEvent) {
        this.setState({
            checked: true,
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

    _buildEvents () {
        const lists = [];

        const sectionsDOM = this.state && this.state.sectionsDOM;

        for (let current of this.data) {
            let checked = false;
            if (this.state.checked && this.state.currentSelected) {
                if (this.state.currentSelected.props.event == current) {
                    checked = true;
                }
            }

            lists.push(
                <Event 
                    parent={this}
                    bounds={this.bounds}
                    event={current} 
                    checked={checked}
                    sectionDOM={sectionsDOM ? sectionsDOM[this._getSectionID(current.start)] : null}
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
                        {this._buildEvents()}
                    </ul>
                </div>
                <EventDescription checked={this.state.checked} event={this.state.currentSelected}/>
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
