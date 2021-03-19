import Axios from 'axios';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

function Comment(props) {
  const user = useSelector((state) => state.user);
  const videoId = props.postId;

  const [CommentValue, setCommentValue] = useState('');

  const handleChange = (e) => {
    setCommentValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const variable = {
      content: CommentValue,
      writer: user.userData._id,
      postId: videoId,
    };

    Axios.post('/api/comment/commentSave', variable).then((response) => {
      if (response.data.success) {
        setCommentValue('');
        props.refreshFunction(response.data.result);
      } else {
        alert('코멘트를 저장하지 못했습니다.');
      }
    });
  };

  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />

      {/* Comment Lists */}

      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment
                  key={index}
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  postId={videoId}
                />
                <ReplyComment
                  refreshFunction={props.refreshFunction}
                  parentCommentId={comment._id}
                  commentLists={props.commentLists}
                  postId={videoId}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={CommentValue}
          placeholder='Write your comment'
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          {' '}
          Submit
        </button>
      </form>
    </div>
  );
}

export default withRouter(Comment);
