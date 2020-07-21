import React, { Component } from 'react';
import _ from 'lodash';
import LoginComponent from './Login';
import DashboardComponent from './Dashboard';

class HomeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: 'VsGoldenAvenues'
    }
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  componentWillMount() {
    console.log("Component about to Mount ! ");
    this.props.componentMounting();
  }

  componentDidMount() {
    console.log("Component Mounted ! ");
    this.props.componentMounted();
  }

  login(username,password) {
    if(this.props.login){
      this.props.login(username,password);
    }
  }

  register(username,password,role) {
    if(this.props.register){
      this.props.register(username,password,role);
    }
  }


  render() {
    return (
      <div>
        {_.get(this.props,"logstatus.status") === 'Loggedin' ? 
          <DashboardComponent user={_.get(this.props,"logstatus.user")} /> : <LoginComponent register={this.register} login={this.login} logstatus={this.props.logstatus}/>}
      </div>
    )
  }
}

export default HomeComponent;