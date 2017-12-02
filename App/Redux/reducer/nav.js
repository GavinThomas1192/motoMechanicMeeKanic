
import AppNavigation from '../../Navigation/AppNavigation'

export default (state, action) => {
 let { type, payload } = action;
 return AppNavigation.router.getStateForAction(action, state) || state 
 }

//  export const reducer = (state, action) => {
//   const newState = AppNavigation.router.getStateForAction(action, state)
//   return newState || state
// }
