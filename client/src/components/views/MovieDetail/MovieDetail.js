import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../../Config';
import { Button, Row } from 'antd';
import MainImage from '../common/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../common/GridCards';
import Favorite from './Sections/Favorite';
import Comments from './Sections/Comment';
import Axios from 'axios';

function MovieDetail(props) {
  console.log(props);
  const movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);
  const [CommentLists, setCommentLists] = useState([]);

  useEffect(() => {
    let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}&language=ko-Korean&page`;
    let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=ko-Korean&page`;

    fetch(endPointInfo)
      .then((response) => response.json())
      .then((response) => {
        setMovie(response);
      });

    fetch(endPointCrew)
      .then((response) => response.json())
      .then((response) => {
        setCasts(response.cast);
      });

    const Variable = {
      movieId: movieId,
    };
    Axios.post('/api/comment/getComments', Variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setCommentLists(response.data.comments);
      } else {
        alert('Failed to get comments Info');
      }
    });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  return (
    <div>
      {/* header */}
      {Movie.backdrop_path && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
          title={Movie.original_title}
          text={Movie.overview}
        />
      )}

      {/* body */}

      <div style={{ width: '85%', margin: '1rem auto' }}>
        {/* Favorit btn */}
        <Favorite
          movieInfo={Movie}
          movieId={movieId}
          userFrom={localStorage.getItem('userId')}
        />
        {/* movie info */}
        {Movie && <MovieInfo movie={Movie} />}
        <br />
        {/* Actors grid */}
        <hr />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '2rem',
            paddingBottom: '2rem',
          }}
        >
          <Button size='large' onClick={toggleActorView}>
            View Actors
          </Button>
        </div>
        {ActorToggle && (
          <Row gutter={[25, 25]}>
            {Casts &&
              Casts.map((cast, index) => (
                <React.Fragment key={index}>
                  <GridCards
                    image={
                      cast.profile_path
                        ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                        : null
                    }
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
        {/* Comments */}
        <Comments
          movieTitle={Movie.original_title}
          CommentLists={CommentLists}
          movieId={movieId}
          refreshFunction={updateComment}
        />
      </div>
    </div>
  );
}

export default withRouter(MovieDetail);
