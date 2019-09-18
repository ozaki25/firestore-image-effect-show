import React, { useEffect, useState } from 'react';
import effects from './constants/effects';
import Image from './components/Image';
import Firestore from './utils/firestore';

function getRandom(list) {
  return list[Date.now() % list.length];
}

function App() {
  const [oldSlide, setOldSlide] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);

  const onReceive = ({ url, caption, comment }) => {
    console.log({ url, caption, comment });
    setOldSlide(currentSlide);
    setCurrentSlide({ url, effect: getRandom(effects) });
  };

  useEffect(() => {
    const firestore = new Firestore();
    firestore.subscribe({ ref: firestore.dbImagesRef, onReceive });
  }, []);

  console.log({ oldSlide, currentSlide });
  return (
    <div>
      {oldSlide && <Image key={performance.now()} {...oldSlide} type="out" />}
      {currentSlide && (
        <Image key={performance.now()} {...currentSlide} type="in" />
      )}
    </div>
  );
}

export default App;
