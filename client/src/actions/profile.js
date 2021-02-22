import {GET_PROFILE,PROFILE_ERROR, UPDATE_PROFILE, DELETE_ACCOUNT, CLEAR_PROFILE,GET_PROFILES,GET_REPOS}from './types';
import axios from 'axios';
import {setAlert} from './alert';


export const getCurrentProfile= ()=> async dispatch=>{

    try {
        const res = await axios.get('/api/profile/me')

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg:error.response.statusText, status: error.response.status}
        })
    }
}

export const getProfiles= ()=> async dispatch=>{

    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile')

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { status: error.response}
        })
    }
}
export const getProfile= (userId)=> async dispatch=>{


    try {
        const res = await axios.get(`/api/profile/users/${userId}`)

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { status: error.response.status}
        })
    }
}

export const getGithubRepos= (userName)=> async dispatch=>{


    try {
        const res = await axios.get(`/api/profile/github/${userName}`)

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { status: error.response.status}
        })
    }
}

export const createProfile = (formData, history, edit=false) => async dispatch=>{
        try{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const res = await axios.post('api/profile', formData, config);

    dispatch({
        type: GET_PROFILE,
        payload: res.data
    })

    dispatch(setAlert(edit ? 'Profile Updated':'Profile Created','success'))

    
        history.push('/dashboard')
    
} catch(err){
    
    dispatch({
        type: PROFILE_ERROR,
        payload: { status: err.response.status}
    })

    
}
}

export const addExperience = (formData, history) => async dispatch =>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const res = await axios.put('api/profile/experience', formData, config);
    
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
    
        dispatch(setAlert('Experience Added','success'))
            history.push('/dashboard')
       
    } catch(err){
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { status: err.response.status}
        })
}
}
export const addEducation = (formData, history) => async dispatch =>{
    try{
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }
    
        const res = await axios.put('api/profile/education', formData, config);
    
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
    
        dispatch(setAlert('Education Added','success'))
            history.push('/dashboard')
       
    } catch(err){
        
        dispatch({
            type: PROFILE_ERROR,
            payload: { status: err.response.status}
        })
}
}


export const deleteExperience = (id)=> async (dispatch) =>{
try{
        const res = await axios.delete(`/api/profile/experience/${id}`) 
        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Experience Removed','success'))
}catch(e){
    dispatch({
        type: PROFILE_ERROR,
        payload: { status: e.response.status}
    })
}

}
export const deleteEducation = (id)=> async (dispatch) =>{
try{
        const res = await axios.delete(`/api/profile/education/${id}`) 
        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Education Removed','success'))
}catch(e){
    dispatch({
        type: PROFILE_ERROR,
        payload: { status: e.response.status}
    })
}

}


export const deleteAccount = () => async (dispatch)=>{
   
   if(window.confirm('Are you sure you want to permanently delete your account?'))
    try{
        const res = await axios.delete(`/api/profile`) 
        dispatch({type: DELETE_ACCOUNT});
        dispatch({type: CLEAR_PROFILE})
        dispatch(setAlert('Your Account has been deleted permanently'))
}catch(e){
    dispatch({
        type: PROFILE_ERROR,
        payload: { status: e.response.status}
    })
}
}