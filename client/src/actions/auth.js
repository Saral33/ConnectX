import { REGISTER_FAIL, REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR ,LOGIN_FAIL,LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE} from './types';
import axios from 'axios';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken'

//Register User

export const loadUser=()=> async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res= await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}



export const registerUser = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/Json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('api/users', body, config);
    dispatch(setAlert('Sign up successful','success',500))
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser())
    
  } catch (err) {
      dispatch({
          type: REGISTER_FAIL
      })
      if(err.response.data.code===11000){
          dispatch(setAlert('User with this Email address already exists','danger','7000'))
      }
  }
};


export const loginUser = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/Json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('api/auth', body, config);
    dispatch(setAlert('Login successful','success','500'));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    
    dispatch(loadUser())
  } catch (err) {
    dispatch({
      type:LOGIN_FAIL
    })
    const error = err.response.data.errors.map(err=>err.msg);
      dispatch(setAlert(error,'danger',2500))
  }
};


export const logout = ()=>(dispatch)=>{
  dispatch({
    type: CLEAR_PROFILE
  })    
  
  dispatch({
        type:LOGOUT
      })
}
