import React, {Component} from 'react';
import _ from 'lodash';

class CandidateComponent extends Component{
    constructor(props){
        super(props);
        this.getCandidatePreview = this.getCandidatePreview.bind(this);
    }

    getCandidatePreview(){
        let user = _.get(this.props,"user.name");
        let userExperience = _.get(this.props,"user.experience",[]);
        userExperience = userExperience.slice(0,3);
        let userCompany = _.get(this.props,"user.company");
        return user ? <div class="card" style={{width: "18rem"}} >
        <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">{user}</text></svg>
        <div class="card-body">
          <h5 class="card-title">{`${user} from ${userCompany}`}</h5>
          <p class="card-text">
            {
                userExperience.map((exp)=>{
                    return <span class="badge badge-dark">{exp}</span>
                })
            }
          </p>
          <a href="javascript:void(0);" class="btn btn-primary">Show</a>
        </div>
      </div> : ""
    }

    render(){
       return (
            <div class="col candidate">
                {this.getCandidatePreview()}
            </div>
       )
    }
} 

export default CandidateComponent;
