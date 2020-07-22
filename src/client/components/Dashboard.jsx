import React, { Component } from 'react';
import _ from 'lodash';
import CandidateComponent from './Candidate';
import BlockComponent from './Block';
class DashboardComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentView: 'VERIFIED',
      candidates : [
        {
          "name": "naveen",
          "company": "myntra",
          "experience": ["caratlane","talentica","beehyv"]
        },
        {
          "name": "bindu",
          "company": "myntra",
          "experience": ["caratlane","talentica","beehyv"]
        },
        {
          "name": "lakshmi",
          "company": "myntra",
          "experience": ["caratlane","talentica","beehyv"]
        },
        {
          "name": "narayana",
          "company": "myntra",
          "experience": ["caratlane","talentica","beehyv"]
        }
      ],
      pending: [
        {
          name: 'naveen',
          claim: 'Groupon',
          points: 10,
        },
        {
          name: 'Bindu',
          claim: 'Groupon',
          points: 20
        },
        {
          name: 'Lakshmi',
          claim: 'Groupon',
          points: 30
        },
        {
          name: 'Narayana',
          claim: 'Groupon',
          points: 20
        }
      ]
    }
    this.getVerifiedResumes = this.getVerifiedResumes.bind(this);
    this.getClaims = this.getClaims.bind(this);
    this.getCurrent = this.getCurrent.bind(this);
  }

  getVerifiedResumes(){
      return <div class="container">
          <div class="row">
           <h1>Verified</h1>
          </div>
          <div class="row">
            {
              this.state.candidates.map((candidate)=>{
                  return <CandidateComponent user={candidate} />
              })
            }
          </div>
      </div>
  }

  getClaims(){
    return <div class="container">
        <div class="row">
         <h1>Pending</h1>
        </div>
        <div class="row">
          {
            this.state.pending.map((candidate)=>{
                return <BlockComponent user={candidate} />
            })
          }
        </div>
    </div>
  }

  getCurrent(){
    return this.state.currentView === "VERIFIED" ? this.getVerifiedResumes(): this.getClaims();
  }

  render() {
    return (
      <div class="container dashboard">
        { `You are logged in as ${_.get(this.props,"user.name")}`}
          <div class="row">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a className={"nav-link "+ (this.state.currentView === 'VERIFIED' ? "active":"")} onClick = {()=>{
                  this.setState({currentView: 'VERIFIED'})
                }} 
                  href="javascript:void(0);">Verifed</a>
              </li>
              <li class="nav-item">
                <a  className={"nav-link "+ (this.state.currentView === 'PENDING' ? "active":"")} onClick = {()=>{
                  this.setState({currentView: 'PENDING'})
                }} 
                href="javascript:void(0);">Pending</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="javascript:void(0);">Add</a>
              </li>
            </ul>
            {this.getCurrent()}
          </div>
      </div>
    )
  }
}

export default DashboardComponent;