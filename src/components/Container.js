import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

function Container({ children, ...props }) {
  return <StyledContainer {...props}>{children}</StyledContainer>;
}

export default Container;
