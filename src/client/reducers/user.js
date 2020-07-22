// Reducers are nothing but just pure functions
import _ from 'lodash';

export default (state = {}, action = { type: "",data:{} }) => {
    switch (action.type) {
      case 'FETCHING_RESUMES':
       return { status: "Fetching", resumes: [] }
      case 'FETCHED_RESUMES':
       let resumes =_.get(action,"data",[]);
       return { status: "Fetched",resumes: resumes }
      case 'FETCH':
       return { status: "Fetched",resumes: [] } 
      default:
        return state
    }
  }