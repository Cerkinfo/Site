const React = require('react');
const moment = require('moment');

require('./Events.scss');

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description_displayed: false
    }
    this.render_date = this.render_date.bind(this);
    this.render_link = this.render_link.bind(this);
    this.render_end = this.render_end.bind(this);
    this.render_description_button = this.render_description_button.bind(this);
    this.toggle_description = this.toggle_description.bind(this);
  }

  toggle_description(_) {
    this.setState({description_displayed: !this.state.description_displayed})
  }

  render_date() {
    const date = moment(this.props.start);
    return (
      <div className="date">
        <div className="day">{date.format("DD")}</div>
        <div className="month">{date.format("MMMM")}</div>
        <div className="year">{date.format("YYYY")}</div>
      </div>
    )
  }

  render_description_button() {
    return (
      (this.props.description!="") &&
        <div className="desc-button-container">
          <button className="desc-button btn-floating btn-medium grey"
            onClick={this.toggle_description}>
            { this.state.description_displayed ?
                <i className="material-icons">keyboard_arrow_up</i>
              :
                <i className="material-icons">dehaze</i>
            }
          </button>
        </div>
    )
  }

  render_link() {
    return (
      (this.props.url!="") &&
        <a className="event-link" href={this.props.url} target="_blank">
          <i className="material-icons">link</i>
        </a>
    )
  }

  render_end() {
    const start = moment(this.props.start);
    const end = moment(this.props.end);
    const single_day_event = (start.format("DD/MM/YYYY")==end.format("DD/MM/YYYY"));
    return (this.props.start!=this.props.end &&
      <div className="end-container">Fini à {end.format("HH:mm")}{ !single_day_event && <span>, le {end.format("DD/MM/YYYY")} </span>}</div>
    )
  }

  render_event_body() {
    return (
      this.state.description_displayed ?
        <div className="event-description-container">
          <div className="event-description">
            {this.props.description}
          </div>
        </div>
      :
        <div className="event-body">
          <div className="event-title">{moment(this.props.start).format("HH:mm")} • {this.props.summary} {this.render_link()}</div>
          { this.props.location!="" &&
            <div className="location-container">
              <i className="material-icons">location_on</i> <span className="location">{this.props.location}</span>
            </div>
          }
          {this.render_end()}
        </div>
    );
  }

  render() {
    return (
      <div className="flex-row event">
        {this.render_date()}
        {this.render_event_body()}
        {this.render_description_button()}
      </div>
    )
  }
}

class Events extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div className="container">
          { this.props.events.map((event, index) => (
              <Event key={index} {...event} />
          ))}
        </div>
      );
    }
}

module.exports = Events;
