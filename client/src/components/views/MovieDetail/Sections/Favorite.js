import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import Axios from 'axios';

function Favorite(props) {
  const userFrom = props.userFrom;
  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  useEffect(() => {
    Axios.post('/api/favorite/favoritenumber', variables).then((response) => {
      if (response.data.success) {
        setFavoriteNumber(response.data.favoriteNumber);
      } else {
        alert('좋아요 숫자를 가져오지 못했습니다');
      }
    });

    Axios.post('/api/favorite/favorited', variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.favorited);
      } else {
        alert('좋아요 정보를 가져오지 못했습니다');
      }
    });
  }, []);

  const addFavoriteMovie = () => {
    if (Favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables).then(
        (response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert('Favorite 리스트에서 삭제하기를 실패했습니다.');
          }
        }
      );
    } else {
      Axios.post('/api/favorite/addToFavorite', variables).then((response) => {
        if (response.data.success) {
          setFavoriteNumber(FavoriteNumber + 1);
          setFavorited(!Favorited);
        } else {
          alert('favorite 리스트에 추가하기를 실패했습니다.');
        }
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '2rem',
        paddingBottom: '1rem',
      }}
    >
      <Button size='large' onClick={addFavoriteMovie}>
        {Favorited ? 'Not Favorite' : 'Add to Favorite'} {FavoriteNumber}
      </Button>
    </div>
  );
}

export default Favorite;
