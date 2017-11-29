//this is a generic user reducer to hold place!
export default (state = [], action) => {
 let { type, payload } = action;
 switch (type) {
     case 'USER_SET':
     console.log('USER SET INTO STORE W/ THIS PAYLOAD', payload)
         return payload;
     case 'USER_CREATE':
         return [payload, ...state];
     case 'USER_UPDATE':
         // return state.map(item => item.userID === payload.userID ? payload : item);
         return payload;
     case 'USER_DELETE':
         return state.filter(item => item.userID !== payload.userID);
     default: return state;
 }
};