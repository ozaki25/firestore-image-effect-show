import React, { useEffect, useState } from 'react';
import images from './constants/images';
import effects from './constants/effects';
import Image from './components/Image';

function getRandom(list) {
  return list[Date.now() % list.length];
}

function App() {
  const [oldSlide, setOldSlide] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(null);

  const onClick = () => {
    setOldSlide(currentSlide);
    setCurrentSlide({
      url: getRandom(images),
      effect: getRandom(effects),
    });
  };

  useEffect(() => {
    onClick();
  }, []);

  console.log({ oldSlide, currentSlide });
  return (
    <div onClick={onClick}>
      {oldSlide && <Image key={performance.now()} {...oldSlide} type="out" />}
      {currentSlide && (
        <Image key={performance.now()} {...currentSlide} type="in" />
      )}
    </div>
  );
}

export default App;
