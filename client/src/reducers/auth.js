import {REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL, LOGOUT,CLEAR_PROFILE, DELETE_ACCOUNT} from '../actions/types';


const initialState= {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};


export default (state=initialState, action)=>{
    const {type,payload}= action;
    switch(type){
        case USER_LOADED:
            return{...state, isAuthenticated: true, user: payload, loading:false};

 

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token',payload.token);
            return{...state, ...payload, isAuthenticated:true, loading:false}
    
        case REGISTER_FAIL: 
        case LOGIN_FAIL:
        case AUTH_ERROR: 
        case LOGOUT:
        
        case DELETE_ACCOUNT:
        localStorage.removeItem('token')
        return{...state, isAuthenticated:false,loading:false,token:null,user:null}

        default: return state;
    }
}