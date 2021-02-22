import {DELETE_POST, GET_POSTS,POST_ERROR, UPDATE_LIKES, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT} from '../actions/types'
import axios from 'axios';
import {setAlert} from './alert';


export const getPosts = ()=> async(dispatch) =>{

try{
    const res = await axios.get('/api/posts');

    dispatch({
        type: GET_POSTS,
        payload: res.data
    })
} catch(e){
    dispatch({
        type: POST_ERROR,
        payload: {status: e.response.status}
    })
}
}

export const getPost = (id)=> async(dispatch) =>{

    try{
        const res = await axios.get(`/api/posts/${id}`);
    
        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch(e){
        dispatch({
            type: POST_ERROR,
            payload: {status: e.response}
        })
    }
    }

 export const addLike = (postId) => async(dispatch)=>{
    try {
        
        const res = await axios.put(`/api/posts/like/${postId}`);

       dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
    } catch (error) {
        console.log(error.response)

        dispatch(setAlert(error.response.data.msg, 'danger', 3000))
        dispatch({
             type: POST_ERROR,
            payload: error.response
        })
    }
}
 export const removeLike = (postId) => async(dispatch)=>{
    try {
        
        const res = await axios.put(`/api/posts/unlike/${postId}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: {postId, likes: res.data}
        })
    } catch (error) {
        dispatch(setAlert(error.response.data.msg, 'danger', 3000))
        dispatch({
            type: POST_ERROR,
            payload: {status: error.response.status}
        })
    }
}
 export const deletePosts = (postId) => async(dispatch)=>{
    try {
        
         await axios.delete(`/api/posts/${postId}`);

        dispatch({
            type: DELETE_POST,
            payload: postId
        })

        dispatch(setAlert('Post removed', 'success', 3000))
    } catch (error) {
        dispatch(setAlert(error.response.data.msg, 'danger', 3000))
        dispatch({
            type: POST_ERROR,
            payload: {status: error.response.status}
        })
    }
}
 export const addPost = (formData) => async(dispatch)=>{
    try {
       
       const res = await axios.post(`/api/posts`, formData);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post added', 'success', 3000))
    } catch (error) {
        
        dispatch({
            type: POST_ERROR,
            payload:{error}
        })
    }
}
 export const addComment = (postId, formData) => async(dispatch)=>{
    try {
       
       const res = await axios.post(`/api/posts/comment/${postId}`,formData);

        dispatch({
            type: ADD_COMMENT,
            payload: res.data
        })

        dispatch(setAlert('Comment added', 'success', 3000))
    } catch (error) {
        
        dispatch({
            type: POST_ERROR,
            payload:{error}
        })
    }
}
 export const deleteComment = (postId, commentId) => async(dispatch)=>{
    try {
       
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

        dispatch({
            type: REMOVE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment removed', 'success', 3000))
    } catch (error) {
        
        dispatch({
            type: POST_ERROR,
            payload:{error}
        })
    }
}


