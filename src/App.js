import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Image from "./components/Image";
import Container from "./components/Container";
import Links from "./components/Links";
import QRCode from "./components/QRCode";
import Firestore from "./utils/firestore";
import { loadImage, ratio, getEffect } from "./utils/imageUtils";
import useSlide from "./hooks/useSlide";

const firestore = new Firestore();

const DISPLAY_TIME = 9000; // ms

const FullScreen = styled.div`
  height: 100%;
  width: 100%;
`;

function App() {
  const [slide, setSlide, oldSlide] = useSlide();
  const [active, setActive] = useState(null);
  const [showQr, setShowQr] = useState(false);
  const fullScreenRef = useRef(null);

  const onReceive = async ({ url, caption }) => {
    const { naturalHeight, naturalWidth } = await loadImage({ url });
    const size = ratio({ height: naturalHeight, width: naturalWidth });
    setSlide({
      url,
      caption,
      size,
      effect: getEffect(),
      key: performance.now()
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

  const onClickQRCode = () => {
    setShowQr(!showQr);
  };

  useEffect(() => {
    firestore.subscribeImages();
    getImageInterval();
  }, []);

  return (
    <>
      <Links
        onClickFullScreen={onClickFullScreen}
        onClickStart={onClickStart}
        onClickStop={onClickStop}
        onClickQRCode={onClickQRCode}
        active={!!active}
      />
      <FullScreen className="punch-full-screen-element" ref={fullScreenRef}>
        <Container>
          {showQr && <QRCode />}
          {oldSlide && <Image key={oldSlide.key} {...oldSlide} type="out" />}
          {slide && <Image key={slide.key} {...slide} type="in" />}
        </Container>
      </FullScreen>
    </>
  );
}

export default App;
