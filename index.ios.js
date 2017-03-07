/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react'
import ReactNative from 'react-native'
import {Router, Scene} from 'react-native-router-flux'
import {Provider, connect} from 'react-redux'
import { createStore, applyMiddleware, combineReducers, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from './app/reducers'
import screen_manage_service from './app/containers/manage_service'
import screen_service_view from './app/containers/service_view'
import screen_add_service from './app/containers/add_service'
import screen_edit_service from './app/containers/edit_service'
import screen_stylists from './app/containers/stylists'
import screen_search_view from './app/containers/searchView'
const RouterWithRedux = connect()(Router)
const {
  AppRegistry
} = ReactNative
// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

export default class servicemodule extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux>
          <Scene key='manage_service' component={screen_manage_service} title='Manage Service Page'  hideNavBar={true}/>
          <Scene key='service_view' component={screen_service_view} title='Service View Page'  hideNavBar={true}/>
          <Scene key='add_service' component={screen_add_service} title='Add Service View'  hideNavBar={true}/>
          <Scene key='edit_service' component={screen_edit_service} title='Edit Service View'  hideNavBar={true}/>
          <Scene key='stylists' component={screen_stylists} title='Stylist View'  hideNavBar={true}/>
          <Scene key='searchview' component={screen_search_view} title='Search View'  hideNavBar={true}/>
        </RouterWithRedux>
      </Provider>
    );
  }
}



AppRegistry.registerComponent('servicemodule', () => servicemodule);
