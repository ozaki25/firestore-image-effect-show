import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Image from './components/Image';
import Container from './components/Container';
import Links from './components/Links';
import Firestore from './utils/firestore';
import { loadImage, ratio, getEffect } from './utils/imageUtils';

const firestore = new Firestore();

const DISPLAY_TIME = 10000; // ms

const FullScreen = styled.div`
  height: 100%;
  width: 100%;
`;

function App() {
  const [slide, setSlide] = useState({ old: null, current: null });
  const [tmpSlide, setTmpSlide] = useState(null);
  const [active, setActive] = useState(null);
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

  const getImageInterval = () => {
    const id = setInterval(() => {
      const image = firestore.getImage();
      if (image) onReceive(image);
    }, DISPLAY_TIME);
    setActive(id);
  };

  const onClickStart = () => {
    if (!active) getImageInterval();
  };

  const onClickStop = () => {
    if (active) {
      clearInterval(active);
      setActive(null);
    }
  };

  const onClickFullScreen = () => {
    fullScreenRef.current.requestFullscreen();
  };

  useEffect(() => {
    firestore.subscribeImages();
    getImageInterval();
  }, []);

  useEffect(() => {
    tmpSlide && setSlide({ old: slide.current, current: tmpSlide });
  }, [tmpSlide]);

  return (
    <>
      <Links
        onClickFullScreen={onClickFullScreen}
        onClickStart={onClickStart}
        onClickStop={onClickStop}
        active={!!active}
      />
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
