import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { API_KEY, API_URL, IMAGE_BASE_URL } from '../../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../common/GridCards';
import { Row, Button } from 'antd';

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-Korean&page=1`;
    getMovies(endPoint);
  }, []);

  const getMovies = (endPoint) => {
    fetch(endPoint)
      .then((response) => response.json())
      .then((response) => {
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        setCurrentPage(response.page);
      });
  };

  const loadMoreItems = () => {
    const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-Korean&page=${
      CurrentPage + 1
    }`;
    getMovies(endPoint);
  };

  return (
    <div
      style={{
        width: '100%',
        margin: '0',
      }}
    >
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Movies by lastest</h2>
        <hr />
        <Row gutter={[25, 25]}>
          {Movies &&
            Movies.map((movies, index) => (
              <React.Fragment key={index}>
                <GridCards
                  image={
                    movies.poster_path
                      ? `${IMAGE_BASE_URL}w500${movies.poster_path}`
                      : null
                  }
                  movieId={movies.id}
                  movieName={movies.original_title}
                />
              </React.Fragment>
            ))}
        </Row>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '30px',
        }}
      >
        <Button size='large' onClick={loadMoreItems}>
          Load more
        </Button>
      </div>
    </div>
  );
}

export default withRouter(LandingPage);
