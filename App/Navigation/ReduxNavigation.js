import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import primaryNav from './AppNavigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

// here is our redux-aware our smart component
// function ReduxNavigation (props) {
//   const { dispatch, nav } = props
//   const navigation = ReactNavigation.addNavigationHelpers({
//     dispatch,
//     state: nav
//   })

//   return <AppNavigation navigation={navigation} />
// }


const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const AppWithNavigationState = reduxifyNavigator(primaryNav, 'root');

const mapStateToProps = state => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { primaryNav, AppNavigator, middleware };
// const mapStateToProps = state => ({ nav: state.nav })
// export default connect(mapStateToProps)(ReduxNavigation)
