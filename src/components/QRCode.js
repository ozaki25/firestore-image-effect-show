import React from "react";
import styled from "styled-components";

const url = process.env.REACT_APP_QRCODE;

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 5px;
`;

function QRCode() {
  return (
    <Container>
      <img height="300px" width="300px" src={url} alt="QRCode" />
    </Container>
  );
}

export default QRCode;
