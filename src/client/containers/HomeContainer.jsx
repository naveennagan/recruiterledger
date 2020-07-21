import { connect } from 'react-redux';
import Home from '../components/Home.jsx';
import apiService from '../services/apiService';

// two functions need to be implemented here
// mapStateToProps
// mapDispatchToProps

const mapStateToProps = (state) => {
  return {
    name: state.home.name,
    logstatus: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
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
        type: "VERIFIYING"
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
    }


  }
}

const HomeView = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeView;