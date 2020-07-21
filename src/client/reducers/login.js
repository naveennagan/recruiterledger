// Reducers are nothing but just pure functions
import _ from 'lodash';

export default (state = {}, action = { type: "",data:{} }) => {
    switch (action.type) {
      case 'VERIFYING':
       return { status: "Verifying", user: {} }
      case 'VERIFIED':
       let user =_.get(action,"user",{});
       return { status: "Loggedin", user: user }
      case 'VERIF':
       return { status: "Please Login/Register", user: {} }  
      case 'LOGGING':
        return { status: "Logging", user: {} }
      case 'LOGGEDIN':
        let usr =_.get(action,"data.user",{});
        return { status: "Loggedin", user: usr }
      case 'LOGG':{
        let message = _.get(action,"data.message","Not able to login");
        return {status: message, user:{} }
      }
      case 'REGISTERING':
        return { status: "Registering", user: {} }
      case 'REGISTERED':
        return { status: "Registered", user: {} }
      case 'REGISTERED_STOPPED':
        return { status: "Registered stopped", user: {} }      
      default:
        return { status: "Please Login/Register", user: {} }
    }
  }