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
          "id": "5f146d9a7e08c814d8b39de9",
          "name": "naveen",
          "company": "myntra",
          "experience": ["caratlane","talentica","beehyv"]
        },
        {
          "id": "5f16d1158d222e26a06eb9a1",
          "name": "bindu",
          "company": "myntra",
          "experience": ["caratlane","talentica","beehyv"]
        },
        {
          "id": "5f16d1f48d222e26a06eb9a2",
          "name": "lakshmi",
          "company": "myntra",
          "experience": ["caratlane","talentica","beehyv"]
        },
        {
          "id": "5f16d276efa3c02db43029fa",
          "name": "narayana",
          "company": "myntra",
          "experience": ["caratlane","talentica","beehyv"]
        }
      ],
      pending: [
        {
          "name": "naveen",
          "claim": "Groupon",
          "points": 10,
        },
        {
          "name": "Bindu",
          "claim": "Groupon",
          "points": 20
        },
        {
          "name": "Lakshmi",
          "claim": "Groupon",
          "points": 30
        },
        {
          "name": "Narayana",
          "claim": "Groupon",
          "points": 20
        }
      ]
    }
    this.getVerifiedResumes = this.getVerifiedResumes.bind(this);
    this.getClaims = this.getClaims.bind(this);
    this.getCurrent = this.getCurrent.bind(this);
  }

  componentDidMount() {
    console.log("Component Mounted ! ");
    this.props.getVerifiedResumes();
    this.props.getPendingResumes();
  }

  getVerifiedResumes(){
      return <div class="container">
          <div class="row">
           <h1>Verified</h1>
          </div>
          <div class="row">
            {
              (this.props.resumes || []).map((candidate)=>{
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
            (this.props.pending || []).map((candidate)=>{
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