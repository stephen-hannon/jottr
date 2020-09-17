import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  color: ${({ theme }) => theme.colors.primary};
`;

const Header: React.FC = () => (
  <HeaderWrapper>
    <h1>Jottr</h1>
  </HeaderWrapper>
)

export default Header;
