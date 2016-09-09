const React = require('react');
const ReactDOM = require('react-dom');
const utils = require('./data.js');
const Event = require('./Event.jsx');
const EventDescription = require('./EventDescription.jsx');
const TimeLineNow = require('./TimeLineNow.jsx');
const moment = require('moment');
require('./Events.scss');

class Events extends React.Component {
    constructor(props) {
        super(props);

        const raw = utils.parse(this.props.data);
        this.state = {
            checked: false,
            currentSelected: null,
            sectionsDOM: null,
            bounds: raw.bounds || [],
        };
        this.data = raw.data || [];

        this.reactEvent = [];

        this.touch = false;
        this.touchStartOffset = 0;
        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    componentDidMount () {
        const result = {};

        const copy = new moment(this.state.bounds.low);
        for (let section = copy.startOf('month'); section.month() <= this.state.bounds.up.month(); section.add(1, 'M')) {
            result[this._getSectionID(section)] = ReactDOM.findDOMNode(this.refs[this._getSectionID(section)]);
        }

        const newCurrent = this.reactEvent.length ? this.reactEvent[0] : this.state.currentSelected;
        const newChecked = Boolean(newCurrent);
        this.setState({
            sectionsDOM: result,
            DOM: ReactDOM.findDOMNode(this),
            currentSelected: newCurrent,
            checked: newChecked,
        });

        // window.addEventListener('resize', this.forceUpdate);
    }

    touchStart (evt) {
        this.touchStartOffset = evt.pageX;
        this.touch = true;
    }

    touchMove (evt) {
        if (this.touch) {
            const size = this.state.DOM.offsetWidth;
            const diff = this.touchStartOffset - evt.pageX;

            // Switching to time scale
            const timeScale = (diff / size) * this.state.bounds.length;

            this.touchStartOffset = evt.pageX;

            const bounds = this.state.bounds
            bounds.low = new moment(bounds.low + timeScale);
            bounds.up = new moment(bounds.up + timeScale);
            this.setState({
                bounds: bounds,
            });
        }
    }

    touchEnd (evt) {
        this.touch = false;
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

    _buildSections (bounds) {
        const sections = [];
        const copy = new moment(bounds.low);
        for (let section = copy.startOf('month'); section.month() <= bounds.up.month(); section.add(1, 'M')) {
            sections.push(
                <section ref={this._getSectionID(section)}>
                    <div className="title">
                        {section.format('MMMM')}
                    </div>
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
                    bounds={this.state.bounds}
                    event={current} 
                    checked={checked}
                    sectionDOM={sectionsDOM ? sectionsDOM[this._getSectionID(current.start)] : null}
                    parentDOM={this.state.DOM}
                />
            );
        }

        this.reactEvent = lists;

        return lists;
    }

    render () {
        const className = this.props.className + " " + (this.props.theme || '');

        return (
            <div> 
                <div className={className} onMouseDown={this.touchStart} onMouseMove={this.touchMove} onMouseUp={this.touchEnd} onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                    <div className="scale">
                        {this._buildSections(this.state.bounds)}
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
    className: 'events-timeline'
};

module.exports = Events;
