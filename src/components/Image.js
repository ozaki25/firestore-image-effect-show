import React from 'react';
import styled, { keyframes } from 'styled-components';
import ImageEffect from '../libs/react-image-effects';

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
`;

const Caption = styled.p`
  color: white;
`;

function Image({ url, effect, caption, type }) {
  return (
    <Container type={type}>
      <ImageEffect url={url} effect={effect} width="540px" height="720px">
        {caption && <Caption>{caption}</Caption>}
      </ImageEffect>
    </Container>
  );
}

export default Image;
