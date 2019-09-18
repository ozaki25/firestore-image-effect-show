import React, { useState } from 'react';
import ImageEffect from 'react-image-effects';
import images from './constants/images';
import effects from './constants/effects';
import './App.css';

function getRandom(list) {
  return list[Date.now() % list.length];
}

function Image({ url, effect, index }) {
  console.log({ url, effect, index });
  const className = index % 2 ? 'slide-in-right' : 'slide-in-left';
  return (
    <div className="slide">
      <div className={className}>
        <ImageEffect url={url} effect={effect} />
      </div>
    </div>
  );
}

function App() {
  const [slides, setSlides] = useState([]);
  const onClick = () => {
    const slide = {
      url: getRandom(images),
      effect: getRandom(effects),
    };
    setSlides([...slides, slide]);
  };
  return (
    <div>
      <h1>Hello</h1>
      <button onClick={onClick}>追加</button>
      {slides.map((slide, i) => (
        <Image key={i} {...slide} index={i} />
      ))}
    </div>
  );
}

export default App;
