import React, {Component} from 'react';
import _ from 'lodash';

class CandidateModalComponent extends Component{
    constructor(props){
        super(props);
        this.closeModal = this.closeModal.bind(this);
    }

    closeModal(){
        this.props.onClose && this.props.onClose();
    }

    getModalView(){
        let user = _.get(this.props,"user.name");
        let userExperience = _.get(this.props,"user.experience",[]);
        let userCompany = _.get(this.props,"user.company");

        return  <div class="modal fade show" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{`${user}'s Details`}</h5>
            <button type="button" class="close" onClick={this.closeModal} data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">
            <p>{`Candidate: ${user}`}</p>
            <p>{`Currently working in ${userCompany}`}</p>
            <p class="card-text">
                {
                    userExperience.map((exp)=>{
                        return <span class="badge badge-dark">{exp}</span>
                    })
                }
            </p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={this.closeModal} data-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
    </div>

    }

    render(){
       return (
          <div>
              {this.getModalView()}
              <div class="shimmer" onClick={this.closeModal}></div>
          </div>
       )
    }
} 

export default CandidateModalComponent;
