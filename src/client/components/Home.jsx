import React, { Component } from 'react';

class HomeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'VsGoldenAvenues'
    }
  }

  componentWillMount() {
    console.log("Component about to Mount ! ");
    this.props.componentMounting();
  }

  componentDidMount() {
    console.log("Component Mounted ! ");
    this.props.componentMounted();
  }

  render() {
    return (
      <div>
        <p>{this.state.name}</p>
        <p>Component Status {this.props.name}</p>
      </div>
    )
  }
}

export default HomeComponent;