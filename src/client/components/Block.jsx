import React, {Component} from 'react';
import _ from 'lodash';
import BlockModalComponent from './BlockModal';

class BlockComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            showDetails: false
        }
        this.getBlockCandidatePreview = this.getBlockCandidatePreview.bind(this);
        this.getModalView = this.getModalView.bind(this);
    }

    getBlockCandidatePreview(){
        let user = _.get(this.props,"user.name");
        let userCompany = _.get(this.props,"user.claim");
        let userPoints = _.get(this.props,"user.points");
        return user ? <div class="card" style={{width: "18rem"}} >
        <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" 
        preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title>
        <rect width="100%" height="100%" fill="#868e96"></rect><text x="50%" y="50%" fill="#dee2e6" dy=".3em">{user}</text></svg>
        <div class="card-body">
          <h5 class="card-title">{`${user} - ${userCompany}`}</h5>
          <h5 class="card-title">{`Score ${userPoints}/100`}</h5>
          <p class="card-text">
             {`${user} claims to work at ${userCompany}`}
          </p>
          <a href="javascript:void(0);" onClick={()=>{
              this.setState({showDetails:true})
          }} class="btn btn-primary">Verify</a>
        </div>
      </div> : ""
    }

    getModalView(){
        return this.state.showDetails ? <BlockModalComponent user={this.props.user} onClose={()=>{ this.setState({showDetails: false})}}/> : "";
    }

    render(){
       return (
            <div class="col candidate">
                {this.getBlockCandidatePreview()}
                {this.getModalView()}
            </div>
       )
    }
} 

export default BlockComponent;
