import React from 'react';
import styled from 'styled-components';

const Link = styled.a`
  padding: 0 0.2em;
`;

function Links({
  onClickFullScreen,
  onClickStart,
  onClickStop,
  onClickQRCode,
  active,
}) {
  return (
    <>
      <Link href="#" onClick={onClickFullScreen}>
        FullScreen
      </Link>
      {active ? (
        <Link href="#" onClick={onClickStop}>
          Stop
        </Link>
      ) : (
        <Link href="#" onClick={onClickStart}>
          Start
        </Link>
      )}
      <Link href="#" onClick={onClickQRCode}>
        QRCode
      </Link>
    </>
  );
}

export default Links;
