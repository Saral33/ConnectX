import React, { Fragment } from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import {addLike, removeLike, deletePosts} from '../../actions/posts'


const PostItem = ({auth, post:{_id, text, name, avatar, user,likes,comments,date}, addLike, removeLike, deletePosts, showItem})=>{

  return(
        <div className="posts">
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                alt=""
              />
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
             {text}
            </p>
             <p className="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            {showItem && <Fragment>
              <button type="button" onClick={e=> addLike(_id) } className="btn btn-light">
              <i className="fas fa-thumbs-up"></i>
              <span>{likes.length}</span>
            </button>
            <button type="button" onClick={e=> removeLike(_id) } className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion <span className='comment-count'>{comments.length}</span>
            </Link>
            {!auth.loading && user ===auth.user._id && (
              <button      
            type="button"
            className="btn btn-danger"
            onClick= {e=> deletePosts(_id)}>
            <i className="fas fa-times"></i>
          </button>  
            )}
              </Fragment>}
            
            
          </div>
        </div>
        </div>
    )}
            
PostItem.defaultProps ={
  showItem: true
}

const mapStateToProps = (state)=>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps,{addLike,removeLike, deletePosts})(PostItem);