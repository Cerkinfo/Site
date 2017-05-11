// @flow
import React, { Component } from 'react';
import axios from 'axios';
require('./SpaceAPIPin.scss');

type Props = {
  url: string,
  offsetLeft: number,
  offsetTop: number,
};

type DefaultProps = {
  offsetLeft: number,
  offsetTop: number,
};

type State = {
  api: Object,
  checked: boolean,
};

export default class SpaceAPIPin extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    offsetLeft: 0,
    offsetTop: 0,
  };

  state = {
    api: {},
    checked: false,
  };

  constructor(props: Props) {
    super(props);
  }

  handleClick() {
    this.setState({
      checked: !(this.state.checked),
    });
  }

  componentWillMount() {
    axios.get(this.props.url, {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(x => this.setState({api: x.data}))
      .catch(x => console.log(x));
  }

  static _formatDate(open: Boolean, date: Date) {
    const day = date.getDate();
    const month = date.getMonth();
    const hour = date.getHours();
    return `${open ? 'Ouvert' : 'Fermé'} depuis ${day}/${month} ${hour}h.`;
  }

  render() {
    const api = this.state.api;
    if (api == {}) {
      return null;
    }

    const style = {
      left: `${this.props.offsetLeft} px`,
      top: `${this.props.offsetTop} px`,
    };

    const open = api.state.open;
    const colorStyle = {
      color: open ? 'green' : 'red',
    };

    return (
      <div style={style} className="space-state">
        <div
          onClick={this.handleClick.bind(this)}
          className={`space-state-box ${this.state.checked ? 'checked' : 'unchecked'}`}
        >
          <b style={colorStyle}>●</b> {open ? 'Ouvert' : 'Fermé'}
        </div>
      </div>
    );
  }
}
