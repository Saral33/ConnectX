import React, { useState } from 'react'
import { connect } from 'react-redux';
import { addComment } from '../../actions/posts';

const CommentForm = ({addComment, postId}) => {

    const [text, setText] = useState('')
    return (
        <div className="post-form">
        <div className="bg-primary p">
          <h3>Post a comment</h3>
        </div>
        <form className="form my-1" onSubmit={(e)=> 
        {
            e.preventDefault();
            
            addComment(postId,{text});
            setText('')
            
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Post a comment"
            required
            value={text}
            onChange= {e=> setText(e.target.value)}
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit"  />
        </form>
      </div>
    )
}

export default connect(null,{addComment})(CommentForm)
