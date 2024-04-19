import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { Api_url } from '../../../auth/auth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../header/modal';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Import the search icon

function Movies_list() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getData = async () => {
        const myHeaders = new Headers();
        // myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

        const requestOptions = {
            method: "GET",
            // headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${Api_url}movies`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getData();
        if (location.pathname === '/') {
            localStorage.removeItem('movie_id');
        }
    }, [location]);


    const handleId = (movieId) => {
        localStorage.setItem('movie_id', movieId);
        openModal();
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMovies = data.filter((movie) => {
        return movie.movieName.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <>
            <Container>
                <Nav>
                    <LeftNav>
                        <SearchContainer>
                            <SearchInput type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={handleSearch} />
                            <SearchText onClick={handleSearch}>
                                <SearchIcon icon={faSearch} onClick={handleSearch} />
                            </SearchText>
                        </SearchContainer>
                    </LeftNav>
                    <RightNav>
                        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                            <img src="/images/Offers.png" alt="offers icon" style={{ marginRight: "5px" }} />
                            <Link to="/offers" style={{ "text-decoration": "none" }}><span style={{ color: 'white', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>OFFERS</span></Link>
                        </Link>
                    </RightNav>
                </Nav>
                <h2 style={{ color: 'white' }}>NOW SHOWING</h2>

                <Content>
                    {filteredMovies.map((movie, key) => (
                        // <Link key={key} to={`/movie/${movie.movieId}`} >
                        <Wrap onClick={() => handleId(movie.movieId)}>
                            <img src={movie.poster} alt={movie.movieName} />
                        </Wrap>
                        // </Link>
                    ))}
                </Content>

            </Container>
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
                <h2>This is a Modal</h2>
                <p>Modal content goes here.</p>
            </Modal>
        </>
    );
}

export default Movies_list;

const Container = styled.div`
    margin-top: 10px;
    padding: 30px 0px 26px;
`;

const Content = styled.div`
    display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr)); 
`;

const Wrap = styled.div`
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    border: 3px solid rgba(249, 249, 249, 0.1);
    box-shadow: rgba(0 0 0 / 69%) 0px 26px 30px -10px,
    rgba(0 0 0 / 73%) 0px 16px 10px -10px;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

    img {
        //width: 100%;
        //height: 100%;
        object-fit: contain;
        width: 320px;
        height: 500px;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: rgba(0 0 0 / 80%) 0px 40px 58px -16px,
        rgba(0 0 0 / 72%) 0px 30px 22px -10px;
        border-color: rgba(249, 249, 249, 0.8);
    }
`;

const Loader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Set the height to occupy the entire container */
`;

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



