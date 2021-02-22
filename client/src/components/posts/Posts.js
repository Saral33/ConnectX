import React, { Fragment, useEffect } from 'react'
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {getPosts} from '../../actions/posts'
import PostItem from  './PostItem'
import PostForm from './PostForm';


const Posts = ({posts:{posts, loading}, getPosts}) => {
      
    useEffect(()=>{
            getPosts();
        },[getPosts])

    return loading || posts==null? <Spinner/>: <Fragment>

          <h1 className="large text-primary">Posts</h1>  
            <p className="lead">
                <i className="fas fa-user"></i>Welcome to the community
            </p>
            <PostForm/>
            <div className="posts">
                {posts.map(post=>(
                    <PostItem key={post._id} post={post}/>
                ))}
            </div>
    </Fragment>
       
    
}

const mapStateToProps = state=>{
    return{
        posts: state.posts
    }
}

export default connect(mapStateToProps,{getPosts})(Posts)
