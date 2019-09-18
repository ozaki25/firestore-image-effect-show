import React from 'react';
import ImageEffect from 'react-image-effects';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1
  }
  100% {
    opacity: 0
  }
`;

const Container = styled.div`
  animation-name: ${({ type }) =>
    type === 'in' ? fadeIn : type === 'out' ? fadeOut : ''};
  animation-duration: 2s;
  animation-delay: 1s;
  animation-fill-mode: both;
  animation-timing-function: ease-in;
  position: absolute;
`;

function Image({ url, effect, type }) {
  return (
    <Container type={type}>
      <ImageEffect url={url} effect={effect} width="540px" height="720px" />
    </Container>
  );
}

export default Image;
