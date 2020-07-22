// Reducers are nothing but just pure functions
import _ from 'lodash';

export default (state = {}, action = { type: "",data:{} }) => {
    switch (action.type) {
      case 'FETCHING_PENDING':
       return { status: "Fetching", pending: [] }
      case 'FETCHED_PENDING':
       let resumes =_.get(action,"data",[]);
       return { status: "Fetched",pending: resumes }
      case 'FETCH':
       return { status: "Fetched",pending: [] } 
      default:
        return state
    }
  }