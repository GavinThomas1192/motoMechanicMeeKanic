import reducer from './reducer';
import thunk from './redux-thunk';
import reporter from './redux-reporter';
import {middleware} from '../Navigation/ReduxNavigation'
import { createStore, applyMiddleware, compose } from 'redux';

let appStoreCreate = () =>
    createStore(reducer, undefined, compose(applyMiddleware(middleware, thunk, reporter)));


export default appStoreCreate;


