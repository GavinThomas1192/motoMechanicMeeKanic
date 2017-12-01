let reporter = store => next => action => {
 console.log('__ACTION__', action);

 try {
     return next(action)
 } catch (e) {
     e.action = action;
     console.error('__ERROR__', e);
     return e;
 }

}

export default reporter;