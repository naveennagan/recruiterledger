import React, { Component } from 'react';


class LoginComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      role: 'CANDIDATE',
      error: '',
      currentView: 'login',
      roles:['CANDIDATE','RECRUITER','VERIFIER']
    }
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.getLoginView = this.getLoginView.bind(this);
    this.getRegisterView = this.getRegisterView.bind(this);
  }

  login() {
    if(!this.state.username){
        this.setState({error:'Please Enter Username'});
        return;
    }
    if(!this.state.password){
        this.setState({error:'Please Enter Password'});
        return;
    }    
    if(this.props.login){
        this.props.login(this.state.username,this.state.password);
    }
  }

  register() {
    if(!this.state.username){
        this.setState({error:'Please Enter Username'});
        return;
    }
    if(!this.state.password){
        this.setState({error:'Please Enter Password'});
        return;
    }    
    if(this.state.roles.indexOf(this.state.role) ===-1 ){
        this.setState({error:'Enter role as CANDIDATE or RECRUITER or VERIFIER'});
        return;
    }    
    if(this.props.register){
        this.props.register(this.state.username,this.state.password,this.state.role);
    }
  }

  getLoginView(){
     return <div>
          <div className="form">
                <h2 className="text-center">Log in</h2>       
                <div className="form-group">
                    <input type="text" className="form-control" 
                     value={this.state.username} 
                     onChange={(event)=>{
                        this.setState({username: event.target.value});
                     }} placeholder="Username" required="required" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" 
                     value={this.state.password} 
                     onChange={(event)=>{
                        this.setState({password: event.target.value});
                     }} placeholder="Password" required="required" />
                </div>
                <div className="form-group">
                    <button type="submit" 
                    onClick={this.login} className="btn btn-primary btn-block">Log in</button>
                </div>    
                {this.state.error ? <div class="alert alert-danger" role="alert">
                    {this.state.error}
                </div>:""}
                <div class="alert alert-secondary" role="alert">
                    {_.get(this.props,"logstatus.status")}
                </div>
               <span>Please remember your password. For password write to naveenatiitk@gmail.com </span> 
            </div>
            <p class="text-center"><a onClick= {()=>{
           this.setState({currentView: 'register'})
       }} href="javascript:void(0);">Register</a></p>
     </div>
  }

  getRegisterView(){
    return <div>
         <div className="form">
               <span>Enter role as CANDIDATE or RECRUITER or VERIFIER</span> 
               <h2 className="text-center">Log in</h2>       
               <div className="form-group">
                   <input type="text" className="form-control" 
                    value={this.state.username} 
                    onChange={(event)=>{
                       this.setState({username: event.target.value});
                    }} placeholder="Username" required="required" />
               </div>
               <div className="form-group">
                   <input type="password" className="form-control" 
                    value={this.state.password} 
                    onChange={(event)=>{
                       this.setState({password: event.target.value});
                    }} placeholder="Password" required="required" />
               </div>
               <div className="form-group">
                   <input type="text" className="form-control" 
                    value={this.state.role} 
                    onChange={(event)=>{
                       this.setState({role: event.target.value});
                    }} placeholder="Role" required="required" />
               </div>
               <div className="form-group">
                   <button type="submit" 
                   onClick={this.register} className="btn btn-primary btn-block">Signup</button>
               </div>    
               {this.state.error ? <div class="alert alert-danger" role="alert">
                   {this.state.error}
               </div>:""}
               <div class="alert alert-secondary" role="alert">
                   {_.get(this.props,"logstatus.status")}
               </div>
              <span>Please remember your password. For password write to naveenatiitk@gmail.com </span> 
           </div>
       <p class="text-center"><a onClick= {()=>{
           this.setState({currentView: 'login'})
       }} href="javascript:void(0);">Login</a></p>
    </div>
 }

  render() {
    return (
        <div className="container">
           {this.state.currentView === 'login' ? this.getLoginView(): this.getRegisterView()}
        </div>
    )
  }
}

export default LoginComponent;