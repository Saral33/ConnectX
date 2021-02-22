import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {deleteComment} from '../../actions/posts'

const CommentItem = ({id, comment:{_id,text,avatar,name,user,date}, deleteComment, auth}) => {
    return (
        <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              class="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">
           {text}
          </p>
           <p class="post-date">
          <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {!auth.loading && auth.user._id === user && (
              <button type="button" onClick={e=> deleteComment(id, _id)} className="btn btn-danger">
                  Delete
              </button>
          )}
        </div>
        </div>
    )
}

const mapStateToProps =(state)=>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps,{deleteComment})(CommentItem)
