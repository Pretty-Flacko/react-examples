import { Component } from 'react';

export default class ClassCount extends Component {
  render() {
    return <p>Number of tasks: {this.props.count}</p>;
  }
}
