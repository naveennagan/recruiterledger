import React, { Component } from 'react';
import _ from 'lodash';
import CandidateComponent from './Candidate';
class DashboardComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      ]
    }
  }

  render() {
    return (
      <div class="container">
        { `You are logged in as ${_.get(this.props,"user.name")}`}
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-primary">ADD</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-primary">VERIFY</button>
          </div>
        </div>
        <div class="row">
           <h1>All Resumes</h1>
        </div>
        <div class="row">
           {
             this.state.candidates.map((candidate)=>{
                return <CandidateComponent user={candidate} />
             })
           }
        </div>
      </div>
    )
  }
}

export default DashboardComponent;