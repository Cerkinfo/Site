// @flow
import React, { Component } from 'react';
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
  url: string,
  api: Object,
  checked: boolean,
};

export default class SpaceAPIPin extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    offsetLeft: 0,
    offsetTop: 0,
  };

  state = {
    url: this.props.url,
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

  componentDidMount() {
    fetch(this.state.url).then((res) => {
      if (res.status !== 200) {
        throw new Error('Wrong Status Code: ' + res.status);
      }

      return res.json();
    }).then((json) => {
      this.setState({
        api: json,
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  static _formatDate(open: Boolean, date: Date) {
    const day = date.getDate();
    const month = date.getMonth();
    const hour = date.getHours();
    return `${open ? 'Ouvert' : 'Fermé'} depuis ${day}/${month} ${hour}h.`;
  }

  render() {
    const api = this.state.api;
    if (!api) {
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
