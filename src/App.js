import React, { useEffect, useState } from 'react';
import images from './constants/images';
import effects from './constants/effects';
import Image from './components/Image';

function getRandom(list) {
  return list[Date.now() % list.length];
}

function App() {
  const [slide, setSlide] = useState(null);

  const onClick = () => {
    setSlide({
      url: getRandom(images),
      effect: getRandom(effects),
    });
  };

  useEffect(() => {
    onClick();
  }, []);

  return (
    <div onClick={onClick}>
      {slide && <Image key={Date.now()} {...slide} />}
    </div>
  );
}

export default App;
