import React from 'react';
import ImageEffect from 'react-image-effects';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
`;

const Container = styled.div`
  animation-name: ${fadeIn};
  animation-duration: 3s;
  animation-delay: 1s;
  animation-fill-mode: both;
`;

function Image({ url, effect }) {
  return (
    <Container>
      <ImageEffect url={url} effect={effect} width="540px" height="720px" />
    </Container>
  );
}

export default Image;
