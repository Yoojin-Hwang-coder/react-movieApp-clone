import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Favorite.css';
import { Popover } from 'antd';
import { IMAGE_BASE_URL } from '../../../Config';

function FavoritePage() {
  const [Favorites, setFavorites] = useState([]);

  useEffect(() => {
    refreshFavorite();
  }, []);

  const refreshFavorite = () => {
    Axios.post('/api/favorite/getFavoriteMovie', {
      userFrom: localStorage.getItem('userId'),
    }).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setFavorites(response.data.favorites);
      } else {
        alert('영화정보를 가져오지 못했습니다.');
      }
    });
  };

  const deleteFavorites = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    };

    Axios.post('/api/favorite/deleteFavorites', variables).then((response) => {
      if (response.data.success) {
        refreshFavorite();
      } else {
        alert('favortie movie를 삭제하지 못했습니다.');
      }
    });
  };

  const renderCards = Favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} />
        ) : (
          'No Imgae '
        )}
      </div>
    );

    return (
      <tr key={index}>
        <Popover content={content} title={favorite.movieTitle}>
          <td>{favorite.movieTitle}</td>
        </Popover>

        <td>{favorite.movieRunTime}mins</td>
        <td>
          <button
            onClick={() => deleteFavorites(favorite.movieId, favorite.userFrom)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie RunTime</th>
            <td>Remove from Favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
