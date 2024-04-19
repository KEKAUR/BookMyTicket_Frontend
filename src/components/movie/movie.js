import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MovieDetails from './movie_details/movie_details'
import { useParams } from 'react-router-dom';
import { Api_url } from '../../auth/auth';

function setZoom() {
    if (navigator.appVersion.indexOf("Win") !== -1) {
        document.body.style.zoom = "90%";
    }
}

const Movie = () => {
    const { movie_id } = useParams();

    const [data, setData] = useState([]);

    const getData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${Api_url}movies/${movie_id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setData(result);
            })
            .catch((error) => console.error(error));
    }


    useEffect(() => {
        getData()
    }, [])
    setZoom()
    return (
        <Container>
            <MovieDetails movie={data} />
        </Container>
    )
}

export default Movie

const Container = styled.div`
    min-height: calc(100vh - 160px);
    padding: 0 calc(3.5vw + 5px);
    // background-color: black;
`