import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon

function MidNav() {
    const handleSearch = () => {
        // Handle search functionality here
    };

    return (
        <Nav>
            <LeftNav>
                <SearchContainer>
                    <SearchInput type="text" placeholder="Search" />
                    <SearchText onClick={handleSearch}>
                        <SearchIcon icon={faSearch} onClick={handleSearch} />
                    </SearchText>
                </SearchContainer>
            </LeftNav>
            <RightNav>
                <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                    <img src="/images/Offers.png" alt="offers icon" style={{ marginRight: "5px" }} />
                    <Link to="/offers" style={{"text-decoration":"none"}}><span style={{ color: 'white', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>OFFERS</span></Link>
                </Link>
            </RightNav>
        </Nav>
    )
}

export default MidNav;

const Nav = styled.nav`
    height: 70px; 
    background: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;

    @media (max-width: 900px) {
        flex: 1;
        display: flex;
        justify-content: space-between;
    }
`;

const LeftNav = styled.div`
    display: flex;
    align-items: center;
`;

const RightNav = styled.div`
    display: flex;
    align-items: center;
`;

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 25px;
    background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent white */
    padding: 5px;
    margin-right: 20px; /* Adjust margin as needed */
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    width: calc(100% - 50px); /* Adjust the width of the input */
    padding: 5px;
    border-radius: 25px;
    background-color: transparent; /* Transparent background */
    color: white; /* Text color */
    margin-right: 10px; /* Margin between input and search text */
`;

const SearchText = styled.span`
    color: white; /* Text color */
    cursor: pointer;
    display: flex;
    align-items: center;
`;

const SearchIcon = styled(FontAwesomeIcon)`
    margin-left: 5px; /* Add margin between text and icon */
`;
