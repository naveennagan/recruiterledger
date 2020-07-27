import { connect } from 'react-redux';
import Home from '../components/Home.jsx';
import apiService from '../services/apiService';

// two functions need to be implemented here
// mapStateToProps
// mapDispatchToProps

const mapStateToProps = (state) => {
  let loginState =  {
    name: state.home.name,
    logstatus: state.login,
    resumes: state.user,
    pending: state.pending,
    confirm: 'CONFIRM'
  };

  console.log(JSON.stringify(loginState));

  return {
    name: state.home.name,
    logstatus: state.login,
    resumes: state.user,
    pending: state.pending,
    confirm: 'CONFIRM'
  }
}

const mapDispatchToProps = (dispatch) => {
  let dispatchProps = {
    componentMounting: () => {
      let mountingAction = {
        type: "MOUNTING"
      }
      dispatch(mountingAction);
      // make api call with token 
      // if loggedin set loggedin status

    },
    componentMounted: async () => {
      let mountedAction = {
        type: "VERIFYING"
      }

      dispatch(mountedAction);

      mountedAction = {
        type: "VERIF",
        user: {}
      }

      if(sessionStorage && sessionStorage.getItem("apptoken")){
       // localStorage.setItem("lastname", "Smith");  
       let token = sessionStorage.getItem("apptoken");
       let verifyOptions = {
             url:'/app/verify',
             data: { token}
          }
        let verifiedResponse = await apiService.makePostCall(verifyOptions);
        if(verifiedResponse.status){
          mountedAction = {
            type: "VERIFIED",
            user: verifiedResponse.data
          }
        }
        else{
          mountedAction = {
            type: "VERIF",
            user: {}
          }
        }
      }

      dispatch(mountedAction);
    },

    login : async (username,password) =>{
      let loginAction = {
        type: "LOGGING"
      }
      dispatch(loginAction);
      
      let loginOptions = {
        url : '/app/login',
        data: { name:username , password}
      }

      let loginResponse = await apiService.makePostCall(loginOptions);

      let loggedInAction;

      if(loginResponse.status){
        loggedInAction = {
          type: "LOGGEDIN",
          data: {
            user: loginResponse.user
          }
        }
        sessionStorage.setItem("apptoken",loginResponse.token);
      }else{
        loggedInAction = {
          type: "LOGG",
          data: {
            user: loginResponse.user
          }
        }
      }
      
      dispatch(loggedInAction);
    },

    register : async (username,password,role) =>{
      let registerAction = {
        type: "REGISTERING"
      }
      dispatch(registerAction);
      
      let registerOptions = {
        url : '/app/register',
        data: { username , password, role}
      }

      let registerResponse = await apiService.makePostCall(registerOptions);

      if(registerResponse.status){
        registerAction = {
          type: "REGISTERED",
          data: {
            user: registerResponse.user
          }
        }
      }
      else{
        registerAction = {
          type: "REGISTERED_STOPPED",
        }
      }
     
      dispatch(registerAction);
    },

    getVerifiedResumes: async () =>{
      let resumeAction = {
        type: "FETCHING_RESUMES"
      }
      dispatch(resumeAction);

      let token = sessionStorage.getItem("apptoken");
      
      let resumeOptions = {
        url : '/user/verified',
        data: { token }
      }

      let resumeResponse = await apiService.makePostCall(resumeOptions);

      if(resumeResponse.status){
        resumeAction = {
          type: "FETCHED_RESUMES",
          data: resumeResponse.results
        }
      }
      else{
        resumeAction = {
          type: "FETCH",
        }
      }
     
      dispatch(resumeAction);

    },

    getPendingResumes: async () =>{
      let resumeAction = {
        type: "FETCHING_PENDING"
      }
      dispatch(resumeAction);

      let token = sessionStorage.getItem("apptoken");
      
      let resumeOptions = {
        url : '/user/pending',
        data: { token }
      }

      let resumeResponse = await apiService.makePostCall(resumeOptions);

      if(resumeResponse.status){
        resumeAction = {
          type: "FETCHED_PENDING",
          data: resumeResponse.results
        }
      }
      else{
        resumeAction = {
          type: "FETCH",
        }
      }
     
      dispatch(resumeAction);

    },

    onSave: async (claim)=>{
      let resumeAction = {
        type: "CLAIM_SAVING"
      }
      dispatch(resumeAction);

      let token = sessionStorage.getItem("apptoken");
      
      let resumeOptions = {
        url : '/user/save',
        data: { token, claim }
      }

      let resumeResponse = await apiService.makePostCall(resumeOptions);

      if(resumeResponse.status){
        resumeAction = {
          type: "CLAIM_SAVED",
          data: resumeResponse.results
        }
      }
      else{
        resumeAction = {
          type: "CLAIM",
        }
      }
      dispatchProps.getPendingResumes();
    },

    onVerify: async (claim)=>{
      let resumeAction = {
        type: "VERIFYING_CLAIM"
      }
      dispatch(resumeAction);

      let token = sessionStorage.getItem("apptoken");
      
      let resumeOptions = {
        url : '/user/verify',
        data: { token, claim }
      }

      let resumeResponse = await apiService.makePostCall(resumeOptions);

      if(resumeResponse.status){
        resumeAction = {
          type: "VERIFIED_CLAIM",
          data: resumeResponse.results
        }
      }
      else{
        resumeAction = {
          type: "CLAIM",
        }
      }
      dispatchProps.getVerifiedResumes();
      dispatchProps.getPendingResumes();
    }

  }
  return dispatchProps;
}

const HomeView = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeView;