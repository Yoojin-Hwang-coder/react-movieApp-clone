import { Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import Axios from 'axios';

function LikeDislikes(props) {
  const [Likes, setLikes] = useState(0);
  const [DisLikes, setDisLikes] = useState(0);
  const [LikesAction, setLikesAction] = useState(null);
  const [DisLikesAction, setDisLikesAction] = useState(null);

  let variable = {};

  if (props.video) {
    variable = { movieId: props.movieId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post('/api/like/getLikes', variable).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes.length);
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikesAction('liked');
          }
        });
      } else {
        alert('Likes에 정보를 가져오지 못했습니다');
      }
    });

    Axios.post('/api/like/getDisLikes', variable).then((response) => {
      if (response.data.success) {
        setDisLikes(response.data.dislikes.length);
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDisLikesAction('disliked');
          }
        });
      } else {
        alert('DisLikes에 정보를 가져오지 못했습니다');
      }
    });
  }, []);

  const onLike = () => {
    if (LikesAction === null) {
      Axios.post('/api/like/upLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikesAction('liked');

          if (DisLikesAction !== null) {
            setDisLikesAction(null);
            setDisLikes(DisLikes - 1);
          }
        } else {
          alert('Like를 올리지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/unLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikesAction(null);
        } else {
          alert('Like를 내리지 못했습니다.');
        }
      });
    }
  };

  const onDisLike = () => {
    if (DisLikesAction !== null) {
      Axios.post('/api/like/unDisLike', variable).then((response) => {
        if (response.data.success) {
          setDisLikes(DisLikes - 1);
          setDisLikesAction(null);
        } else {
          alert('DisLike를 지우지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/upDisLike', variable).then((response) => {
        if (response.data.success) {
          setDisLikes(DisLikes + 1);
          setDisLikesAction('disliked');

          if (LikesAction !== null) {
            setLikesAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert('Like를 내리지 못했습니다.');
        }
      });
    }
  };

  return (
    <div>
      <span key='comment-basic-like'>
        <Tooltip title='like'>
          <LikeOutlined
            theme={LikesAction === 'liked' ? 'filled' : 'outlined'}
            onClick={onLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key='comment-basic-like'>
        <Tooltip title='like'>
          <DislikeOutlined
            theme={DisLikesAction === 'disliked' ? 'filled' : 'outlined'}
            onClick={onDisLike}
          />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{DisLikes}</span>
      </span>
      &nbsp;&nbsp;
    </div>
  );
}

export default LikeDislikes;
