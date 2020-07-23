import React, {Component} from 'react';
import _ from 'lodash';

class AddExpModalComponent extends Component{
    constructor(props){
        super(props);
        this.getModalView = this.getModalView.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            claim:'',
            message: "Enter a valid claim!"
        }
        this.saveClaim = this.saveClaim.bind(this);
    }

    closeModal(){
        this.props.onClose && this.props.onClose();
    }

    saveClaim(){
        if(!this.state.claim){
            this.setState({message:"Please enter a claim"})
            return;
        }
        this.props.onSave && this.props.onSave(this.state.claim);
        this.props.onClose && this.props.onClose();
    }

    getModalView(){
        let user = _.get(this.props,"user.name");

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
               <p>Claim your current company as</p>
               <input type="text" className="form-control" 
                     value={this.state.claim} 
                     onChange={(event)=>{
                        this.setState({claim: event.target.value});
                     }} placeholder="Company" required="required" />
                     <p>{this.state.message}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" onClick={this.saveClaim} data-dismiss="modal">Save</button>
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

export default AddExpModalComponent;
