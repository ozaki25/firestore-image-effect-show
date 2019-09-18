import React, { useEffect, useState } from 'react';
import effects from './constants/effects';
import Image from './components/Image';
import Firestore from './utils/firestore';

function getRandom(list) {
  return list[Date.now() % list.length];
}

function App() {
  const [slide, setSlide] = useState({ old: null, current: null });

  const onReceive = ({ url, caption, comment }) => {
    console.log({ url, caption, comment, slide });
    setSlide({
      old: slide.current,
      current: { url, effect: getRandom(effects) },
    });
  };

  useEffect(() => {
    const firestore = new Firestore();
    firestore.subscribe({ ref: firestore.dbImagesRef, onReceive });
  }, []);

  console.log({ slide });
  return (
    <div>
      {slide.old && <Image key={performance.now()} {...slide.old} type="out" />}
      {slide.current && (
        <Image key={performance.now()} {...slide.current} type="in" />
      )}
    </div>
  );
}

export default App;
