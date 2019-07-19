import React, { Component } from "react";
import styled from "styled-components";

const Header = styled.header`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border: 1px solid #a2a2a2;
  background-color: #f4f4f4;
  -webkit-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.75);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
`;

const Logo = styled.div`
  margin: 0;
  font-size: 1.45em;
`;

const MainNav = styled.ul`
  margin-top: 5px;
`;

const Li = styled.li`
  padding: 10px 15px;
  text-transform: uppercase;
  text-align: center;
  display: block;
`;

const LogoAnchor = styled.a`
  padding: 10px 15px;
  text-transform: uppercase;
  text-align: center;
  display: block;
  :hover {
    color: #718daa;
  }
`;

export default class Nav extends Component {
  render() {
    return (
      <>
        <Header>
          <Logo>
            <LogoAnchor>
              <a href="#">GitHub Analyser</a>
            </LogoAnchor>
          </Logo>
          <MainNav>
            <Li>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
            </Li>
          </MainNav>
        </Header>
      </>
    );
  }
}
