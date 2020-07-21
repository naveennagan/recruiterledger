import React, { Component } from 'react';
import _ from 'lodash';
class DashboardComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        { `You are logged in as ${_.get(this.props,"user.name")}`}
      </div>
    )
  }
}

export default DashboardComponent;