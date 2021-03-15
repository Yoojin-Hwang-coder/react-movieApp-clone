import React from 'react';
import { Col } from 'antd';

function GridCards(props) {
  if (props.landingPage) {
    return (
      <Col lg={6} md={8} xs={24}>
        <div
          style={{
            position: 'relative',
            margin: '0, auto',
          }}
        >
          <a href={`/movie/${props.movieId}`}>
            <img
              style={{ width: '100%', height: '500px' }}
              src={props.image}
              alt={props.movieName}
            />
          </a>
        </div>
      </Col>
    );
  } else {
    return (
      <Col lg={6} md={8} xs={24}>
        <div
          style={{
            position: 'relative',
            margin: '0, auto',
          }}
        >
          <img style={{ width: '100%', height: '500px' }} src={props.image} />
        </div>
      </Col>
    );
  }
}

export default GridCards;
