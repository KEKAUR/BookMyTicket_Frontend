// Header.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import Modal from './modal'; // Import the Modal component
import { CgProfile } from "react-icons/cg";
import { toast } from 'react-toastify';

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("role");
        localStorage.removeItem("user_id");
        localStorage.removeItem("movie_id");
        localStorage.removeItem("theatre_id");
        navigate("/");
        setIsLogin(false); 
        window.location.reload();
        toast.success("Logout Successful");
    }

    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        setIsLogin(!!userId); 
    }, [])

    return (
        <HeaderContainer>
            <Nav>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span style={{ textTransform: 'uppercase', fontWeight: 'bold', color: 'white', fontSize: '1.2em' }}>ShowFlix</span>
                </Link>
                <NavMenu>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <img width={25} src="/images/home.svg" alt="home icon" />
                        <span >HOME</span>
                    </Link>
                    <a>

                    </a>
                    <a onClick={openModal}> {/* Open Modal button */}
                        <img width={25} src="/images/location4.png" alt="location icon" />
                        <span>LOCATION</span>
                    </a>

                </NavMenu>
                {!isLogin ? (
                    <Link to="/login" style={{ textDecoration: "none" }}>
                    <div className='UserImg'>
                        <LogoutButton >
                            Log In
                        </LogoutButton>
                    </div>
                             </Link>
                   
                ) : (
                    <>
                    <Link to="/user">
                        <div className='UserImg'> <CgProfile style={{ fontSize: "35px", color: "white" }} /></div>
                                     </Link>
                    <LogoutButton onClick={() => handleLogOut()}>
                        Log Out
                    </LogoutButton>
                </>
                )}
            </Nav>
            {/* Render the Modal component */}
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                <h2>This is a Modal</h2>
                <p>Modal content goes here.</p>
            </Modal>
        </HeaderContainer>
    );
}

export default Header;

const LogoutButton = styled.div`
margin-left:10px;
  top: 20px;
//   right: 100px; 
  background-color: #fff;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }`

const HeaderContainer = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
   
`;

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`;

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
 
    a {
        text-decoration: none;
        color: white;
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
 
        span {
            font-size: 15px;
            letter-spacing: 1.42px;
            position: relative;
 margin-left: 5px;

            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0.5);
            }
        }
 
        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`;

