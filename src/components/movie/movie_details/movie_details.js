import React, { useState } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import 'font-awesome/css/font-awesome.min.css'
import { Link, useLocation } from "react-router-dom";

const MovieDetails = (props) => {
    const [mute, setMute] = useState(true);
    const location = useLocation();

    return (
        <Container>
            <Details>
                <h1>
                    {props.movie.movieName}
                </h1>
                <SubTitle>
                    {props.movie.language} • {props.movie.rating}
                </SubTitle>
                <Description>
                    {props.movie.plot}
                </Description>
                {
                    location.pathname != `movie/${props.movie.movieId}` ?
                        <Link to={'/booking/' + props.movie.movieId} style={{ "text-decoration": "none" }}>
                            <BookTicket style={{ marginLeft: "150px" }}>
                                <img src="/images/ticket.png" alt="" style={{ marginRight: "10px" }} />
                                <span>CHECK TICKETS</span>
                            </BookTicket>
                        </Link> :
                        <></>
                }

            </Details>
            <Trailer>
                <MovieTrailerPlayer>
                    <ReactPlayer id='MovieTrailer' url={props.movie.trailer} playing={true} loop={true} muted={mute} controls={false} width='100%' height='100%' />
                    <UnMute onClick={() => setMute(!mute)}>
                    </UnMute>
                </MovieTrailerPlayer>
            </Trailer>
        </Container>
    )
}

export default MovieDetails

const Container = styled.div`
    display: flex;
    margin-top: 120px;
    // height: 100%;
    // width: 100%;
    // background: #0c111b;
    border-radius: 10px;
    overflow: hidden;
    background-color:black;

    @media (max-width: 900px) {
        flex-direction: column-reverse;
        
    }
`


const Details = styled.div`
    // width: 40%;
    padding: 0px 36px 0px;
    color: #ffffff;
    align-items: center;
    text-align:left; !important

    @media (max-width: 900px) {
        width: 100%;
    }
`

const SubTitle = styled.div`
    color: rgb(249, 249, 249, 0.6);
    font-size: 15px;
    min-height: 20px;
    margin-top: 26px;
`

const Description = styled.div`
    // width: 80%;
    line-height: 1.4;
    font-size: 20px;
    margin-top: 16px;
    color: rgb(249, 249, 249, 0.8);

    @media (max-width: 900px) {
        // width: 100%;
    }
`

const BookTicket = styled.button`
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left:10px
    border-radius: 4px;
    font-size: 15px;
    padding: 0px 24px; 
    display: flex;
    align-items: center;
    justify-content:center;
    height: 56px;
    background: rgb(249, 249, 249, 0.8);
    border: none;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover {
        background: rgb(249, 249, 249);
    }

    @media (max-width: 900px) {
        // margin-left:0px;
    }
`

const Trailer = styled.div`
    width: 60%;

    @media (max-width: 900px) {
        width: 100%;
    }
`

const MovieTrailerPlayer = styled.div`
    
    position: relative;
    padding-top: 56.25%;
    
    #MovieTrailer {
        position: absolute;
        top: 0;
        left: 0;
        pointer-events: none;
    }
`

const UnMute = styled.button`
    border-radius: 50%;
    padding: 8px 8px;
    background: rgb(249, 249, 249, 0.6);
    position: absolute;
    left:5px;
    bottom:5px;

    &: hover {
        background: rgb(249, 249, 249);
    }
`