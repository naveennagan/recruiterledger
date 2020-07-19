import { connect } from 'react-redux';
import Home from '../components/Home.jsx';

// two functions need to be implemented here
// mapStateToProps
// mapDispatchToProps

const mapStateToProps = (state) => {
  return {
    name: state.home.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    componentMounting: () => {
      let mountingAction = {
        type: "MOUNTING"
      }
      dispatch(mountingAction);
    },
    componentMounted: () => {
      let mountedAction = {
        type: "MOUNTED"
      }
      dispatch(mountedAction);
    }
  }
}

const HomeView = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeView;