import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterRow>
        <FooterIconLink href="#"><FontAwesomeIcon icon={faFacebook} style={{ fontSize: '2em', color: '#3b5998' }} /></FooterIconLink>
        <FooterIconLink href="#"><FontAwesomeIcon icon={faInstagram} style={{ fontSize: '2em', color: '#bc2a8d' }} /></FooterIconLink>
        <FooterIconLink href="#"><FontAwesomeIcon icon={faYoutube} style={{ fontSize: '2em', color: '#c4302b' }} /></FooterIconLink>
        <FooterIconLink href="#"><FontAwesomeIcon icon={faTwitter} style={{ fontSize: '2em', color: '#00acee' }} /></FooterIconLink>
        <FooterIconLink href="#"><FontAwesomeIcon icon={faGithub} style={{ fontSize: '2em', color: '#4078c0' }} /></FooterIconLink>
      </FooterRow>
      <FooterRow>
        <FooterList>
          <FooterLink href="#" style={{ fontSize: '1em' }}>Contact us</FooterLink><br />
          <FooterLink href="#" style={{ fontSize: '1em' }}>Privacy Policy</FooterLink><br />
          <FooterLink href="#" style={{ fontSize: '1em' }}>Terms & Conditions</FooterLink><br />
        </FooterList>
      </FooterRow>
      <FooterRow style={{ fontSize: '1em' }}>
      SHOWFLIX Copyright © 2024 SHOWFLIX - All rights reserved 
      </FooterRow>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  //position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #000;
  padding: 30px 0;
  font-family: 'Play', sans-serif;
  text-align: center;
`;


const FooterRow = styled.div`
  width: 100%;
  margin: 0 auto; /* Center align */
  padding: 0% 0%;
  color: gray;
  font-size: 1em; /* Default font size */
  display: flex;
  justify-content: center;
`;

const FooterIconLink = styled.a`
  text-decoration: none;
  transition: 0.5s;
  margin: 0 1%;
`;

const FooterList = styled.ul`
  width: 100%;
  margin: 0 auto; /* Center align */
`;

const FooterLink = styled.a`
  text-decoration: none;
  color: gray;
  transition: 0.5s;
  &:hover {
    color: #fff;
  }
`;

export default Footer;
