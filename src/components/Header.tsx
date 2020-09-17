import React from 'react';
import styled from 'styled-components';
import { flexRow, flexChild } from 'styles/flex';

const HeaderWrapper = styled.div`
  ${flexRow}
  color: ${({ theme }) => theme.colors.primary};
  padding: 1.5rem 3rem;
`;

const Title = styled.h1`
  ${flexChild}
  margin: 0;
`;

const Nav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  display: inline-block;
`;

const Header: React.FC = () => (
  <HeaderWrapper>
    <Title>Jottr</Title>
    <Nav role="navigation">
      <NavItem>
        <a href="https://github.com/stephen-hannon/jottr">Source code</a>
      </NavItem>
    </Nav>
  </HeaderWrapper>
);

export default Header;
