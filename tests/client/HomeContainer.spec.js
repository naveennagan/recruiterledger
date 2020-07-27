import React from 'react'
import { shallow, mount } from 'enzyme';
import initialLoginState from '../../resources/initState';
import {HomeContainer} from '../../src/client/containers/HomeContainer';



describe('HOME CONTAINER -- LOGIN STATE',()=>{
    const initialState = initialLoginState
    const mockStore = configureStore()
    let store,container

    beforeEach(()=>{
        store = mockStore(initialState)
        container = shallow(<HomeContainer store={store} /> )  
    })
   
    const renderedValue =  container.toJSON()

    expect(renderedValue).toMatchSnapshot();
  

});
