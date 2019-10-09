import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Image from './components/Image';
import Container from './components/Container';
import Firestore from './utils/firestore';
import { loadImage, ratio, getEffect } from './utils/imageUtils';

const firestore = new Firestore();

const LinkButton = styled.a`
  position: absolute;
  top: 0;
`;

const FullScreen = styled.div`
  height: 100%;
  width: 100%;
`;

function App() {
  const [slide, setSlide] = useState({ old: null, current: null });
  const [tmpSlide, setTmpSlide] = useState(null);
  const fullScreenRef = useRef(null);

  const onReceive = async ({ url, caption, comment }) => {
    const { naturalHeight, naturalWidth } = await loadImage({ url });
    const size = ratio({ height: naturalHeight, width: naturalWidth });
    console.log({
      url,
      caption,
      comment,
      slide,
      naturalHeight,
      naturalWidth,
      size,
    });
    setTmpSlide({
      url,
      caption,
      comment,
      size,
      effect: getEffect(),
      key: performance.now(),
    });
  };

  const getImageInteral = () => {
    setInterval(() => {
      const image = firestore.getImage();
      if (image) onReceive(image);
    }, 10000);
  };

  const onClickFullScreen = () => {
    fullScreenRef.current.requestFullscreen();
  };

  useEffect(() => {
    firestore.subscribeImages();
    getImageInteral();
  }, []);

  useEffect(() => {
    if (tmpSlide) {
      setSlide({
        old: slide.current,
        current: tmpSlide,
      });
    }
  }, [tmpSlide]);

  return (
    <>
      <LinkButton href="#" onClick={onClickFullScreen}>
        Full Screen
      </LinkButton>
      <FullScreen ref={fullScreenRef}>
        <Container>
          {slide.old && <Image key={slide.old.key} {...slide.old} type="out" />}
          {slide.current && (
            <Image key={slide.current.key} {...slide.current} type="in" />
          )}
        </Container>
      </FullScreen>
    </>
  );
}

export default App;
