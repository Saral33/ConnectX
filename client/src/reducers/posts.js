/* eslint-disable import/no-anonymous-default-export */
import {ADD_COMMENT, ADD_POST, DELETE_POST, GET_POST, GET_POSTS,POST_ERROR, UPDATE_LIKES,REMOVE_COMMENT} from '../actions/types'


const initialState ={
    post: null,
    posts:[],
    loading:true,
    errors: {}
}



export default function(state=initialState, action){

    const{payload,type}= action;

    switch(type){
        case GET_POSTS:
            return{...state, posts: payload, loading:false}
        
        case GET_POST:
            return{...state, post:payload, loading:false}

        case ADD_COMMENT:
            return{...state,post:{...state.post, comments: payload }, loading:false}
        case REMOVE_COMMENT:
            return{...state, post:{...state.post,comments:state.post.comments.filter(com=> com._id!== payload)}, loading:false}
        case POST_ERROR:
            return{...state, errors: payload, loading:false}

        case UPDATE_LIKES:
            return{...state, 
                    posts: state.posts.map(post=> post._id=== payload.postId ? {...post, likes: payload.likes}: post), 
                loading:false}

        case DELETE_POST:
            return{
                ...state, posts: state.posts.filter(post=> post._id!== payload), loading: false
            }

            case ADD_POST:
                return{
                    ...state, posts: [payload,...state.posts], loading: false
                }
    default: return state;
}
    }