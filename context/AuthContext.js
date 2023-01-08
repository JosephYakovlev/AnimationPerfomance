import createAuthContext from './createAuthContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {user: null};
    case 'signin':
      return {
        user: action.payload,
      };
    case 'signup':
      return {
        user: action.payload,
      };
    default:
      return state;
  }
};

const signup = dispatch => {
  return ({userDump}) => {
    console.log('Signup');
  };
};

const signin  = dispatch => {
  return (userDump) => {
    // console.log('SIGNINGING')
    // console.log(userDump)
    // Do some API Request here;
    dispatch({
      type: 'signin',
      payload: {
        user: userDump,
      },
    });
  };
};

const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'});
  };
};

export const {Provider, Context} = createAuthContext(
  authReducer,
  {signin, signout, signup},
  {user: null},
);