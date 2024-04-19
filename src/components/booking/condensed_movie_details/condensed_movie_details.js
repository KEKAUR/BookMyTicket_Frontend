import React from 'react'
import styled from 'styled-components'

const CondensedMovieDetails = (props) => {

    function convertPriceToTime(price) {
        // Calculate hours and minutes
        const hours = Math.floor(price / 60);
        const minutes = price % 60;
    
        return `${hours}h ${minutes}m`;
    }
  
    return (
        <Container>
            {/* <img src={props.movie.poster} alt="cinema icon" width='150px'/> */}
            <Details>
                <h1>
                    {props.movie.movieName}
                </h1>
                <SubTitle>
                {props.movie.language} • {convertPriceToTime(props.movie.ticketBasePrice)} • {props.movie.genres}
                </SubTitle>
            </Details>
        </Container>
    )
}

export default CondensedMovieDetails

const Container = styled.div`
    padding: 30px 0px 0px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex: 1;
    color:white;
    align-items: center;
    margin-top: 36px;
    
    background-color: black;

    img {
        padding: 0px 20px 0px 5px;
    }
`

const Details = styled.div`
    line-height: 3px;
    padding: 10px;
    text-align: left;

    @media (max-width: 900px) {
        h1 {
            font-size: 30px;
        }
    }
`

const SubTitle = styled.div`
    color: rgb(249, 249, 249, 0.6);
    font-size: 20px;
    min-height: 20px;
    margin-top: 36px;
`



