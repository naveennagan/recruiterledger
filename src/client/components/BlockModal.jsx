import React, {Component} from 'react';
import _ from 'lodash';

class BlockModalComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            rules : [
                {
                    ruleDesc: "If you verify from other company",
                    rulePoints: 10
                },
                {
                    ruleDesc: "If you verify from same company",
                    rulePoints: 30
                },
                {
                    ruleDesc: "If you verify via call (coming soon.)",
                    rulePoints: 40
                },
            ]
        }
        this.verifyBlock = this.verifyBlock.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    
    closeModal(){
        this.props.onClose && this.props.onClose();
    }

    verifyBlock(){
        this.props.onClose && this.props.onVerify(this.props.user);
    }

    getModalView(){
        let user = _.get(this.props,"user.name");
        let userPoints = _.get(this.props,"user.points");
        let userCompany = _.get(this.props,"user.claim");

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
            <h1>{`Candidate: ${user}`}</h1>
            <p>{`Claiming to have worked in ${userCompany}`}</p>
            <p>{`Score so far - ${userPoints}/100`}</p>
            <div class="container">
                {
                    this.state.rules.map((rule)=>{
                        return <div class="p-3 mb-2 bg-white text-dark">{`${rule.ruleDesc} -- ${rule.rulePoints}`}</div>
                    })
                }
            </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onClick={this.verifyBlock} data-dismiss="modal">Verify</button>
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

export default BlockModalComponent;
