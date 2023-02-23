import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, Outlet } from 'react-router-dom';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 16px 15px;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  justify-content: flex-start;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
  font-size: 18px;
  font-weight: border;
`;
const Title = styled.span`
  font-size: 48px;
  /* color: ${(props) => props.theme.accentColor}; */
  display: block;
  @supports (background-clip: text) or (-webkit-background-clip: text) {
    background-image: url("data:image/svg+xml,%3Csvg width='2250' height='900' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath fill='%2300A080' d='M0 0h2255v899H0z'/%3E%3Ccircle cx='366' cy='207' r='366' fill='%2300FDCF'/%3E%3Ccircle cx='1777.5' cy='318.5' r='477.5' fill='%2300FDCF'/%3E%3Ccircle cx='1215' cy='737' r='366' fill='%23008060'/%3E%3C/g%3E%3C/svg%3E%0A");
    background-size: 110% auto;
    background-position: center;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
`;
const Header = styled.header`
  background: ${(props) => props.theme.bgColor};
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  color: #fff;
  font-family: 'Kanit', sans-serif;
  font-weight: 900;
`;

export default function Navigation() {
  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CurrencyBitcoinIcon fontSize='large' />
        </LogoContainer>
        <Header>
          <Title>Blockchains</Title>
        </Header>
        <NavLinks>
          <NavLink to='/coins'>Coins</NavLink>
        </NavLinks>
      </NavigationContainer>
      <Outlet />
    </>
  );
}
