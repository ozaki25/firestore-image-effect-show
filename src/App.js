import React, { useEffect, useState } from 'react';
import effects from './constants/effects';
import Image from './components/Image';
import Container from './components/Container';
import Firestore from './utils/firestore';
import loadImage, { ratio } from './utils/loadImage';

function getRandom(list) {
  return list[Date.now() % list.length];
}

function App() {
  const [slide, setSlide] = useState({ old: null, current: null });
  const [tmpSlide, setTmpSlide] = useState(null);

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
    <Container>
      {slide.old && <Image key={slide.old.key} {...slide.old} type="out" />}
      {slide.current && (
        <Image key={slide.current.key} {...slide.current} type="in" />
      )}
    </Container>
  );
}

export default App;
