import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import effects from './constants/effects';
import Image from './components/Image';
import Container from './components/Container';
import Firestore from './utils/firestore';
import loadImage, { ratio } from './utils/loadImage';

const LinkButton = styled.a`
  position: absolute;
  top: 0;
`;

const FullScreen = styled.div`
  height: 100%;
  width: 100%;
`;

function getRandom(list) {
  return list[Date.now() % list.length];
}

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
      effect: getRandom(effects),
      key: performance.now(),
    });
  };

  const onClickFullScreen = () => {
    console.log(fullScreenRef.current);
    fullScreenRef.current.requestFullscreen();
  };

  useEffect(() => {
    const firestore = new Firestore();
    firestore.subscribeImages({ onReceive });
  }, []);

  useEffect(() => {
    if (tmpSlide) {
      setSlide({
        old: slide.current,
        current: tmpSlide,
      });
    }
  }, [tmpSlide]);

  console.log({ slide });
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
