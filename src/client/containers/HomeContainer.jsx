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
    componentMounted: () => {
      let mountedAction = {
        type: "MOUNTED"
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