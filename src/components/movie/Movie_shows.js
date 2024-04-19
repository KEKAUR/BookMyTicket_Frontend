import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Circles } from 'react-loader-spinner'
import { Link } from "react-router-dom";
import { Api_url } from '../../auth/auth';

const Movie_shows = () => {

    const { theatreId } = useParams();

    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    const getShowsOfTheatre = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");
  
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${Api_url}shows/theatre-id/${theatreId}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                setShows(result);
                setLoading(false);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        getShowsOfTheatre();
    }, [])
    return (
        <Container>
            <h2 style={{ color: 'white' }}>NOW SHOWING</h2>
            {loading ? (
                <Loader><Circles
                    height="80"
                    width="80"
                    color="white"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /></Loader>
            ) : (
                <Content>
                    {shows.map((movie, key) => (
                        <Link key={key} to={`/movie/${movie.movie.movieId}`}>
                            <Wrap onClick={() => localStorage.setItem("show_id", movie.showId)}>
                                <img src={movie.movie.poster} alt={movie.movie.movieName} />
                            </Wrap>
                        </Link>
                    ))}
                </Content>
            )}
        </Container>
    );
}

export default Movie_shows

const Container = styled.div`
    margin-top: 10px;
    padding: 30px 0px 50px;
    background-color: black;
    margin-top: 50px;
    margin-top: 50px;
    padding: 30px 0px 26px;
    background-color: black;

`;

const Content = styled.div`
    //display: grid;
    grid-gap: 25px;
    grid-template-columns: repeat(4, minmax(0, 1fr)); 
    display: flex;
    justify-content: center;
    margin-top: 50px;
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
