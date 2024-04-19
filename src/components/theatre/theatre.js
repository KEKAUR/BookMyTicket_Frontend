import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MovieDetails from '../movie/movie_details/movie_details';
import { Api_url } from '../../auth/auth';

const Theatre = () => {

    const { city } = useParams();

    const [theatres, setTheatres] = useState([]);
    const [theatre, setTheatre] = useState([]);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [data, setData] = useState([]);
    const location = useLocation();

    const showTheatres = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");
   
        const requestOptions = {
            method: "GET",
            headers: myHeaders,

            redirect: "follow"
        };

        fetch(`${Api_url}theatres/city/${city}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTheatres(result);
            })
            .catch((error) => console.error(error));

    }

    const getData = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");
  
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${Api_url}movies/${localStorage.getItem("movie_id")}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setData(result);
            })
            .catch((error) => console.error(error));
    }

    const navigate = useNavigate();

    const handleShowShows = (theatreId) => {
        const selectedTheatre = theatres.find(theatre => theatre.theatreId === theatreId);
        setSelectedTheatre(selectedTheatre);
        navigate(`/show/${theatreId}`)
    }

    const handleShowBooking = (theatreId) => {
        const selectedTheatre = theatres.find(theatre => theatre.theatreId === theatreId);
        setSelectedTheatre(selectedTheatre);
        localStorage.setItem("theatre_id", theatreId)
        navigate(`/booking/${localStorage.getItem("movie_id")}`)
    }

    const showTheatreForMovie = () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");
  
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        fetch(`${Api_url}shows/movieid/${localStorage.getItem("movie_id")}/city/${city}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTheatre(result);
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {

        if (!localStorage.getItem("movie_id"))
            showTheatres();
        else
            showTheatreForMovie();
        getData();
    }, []);

    useEffect(() => {
        getData();
        if (location.pathname === '/') {
            localStorage.getItem("movie_id");
        }
    }, [location]);

    return (
        <>
            {theatres.length != 0 || theatre.length != 0 ? (
                !localStorage.getItem("movie_id") ? (
                    
                    <CardContainer>
                          <h1 style={{ color: '#ffffff', bottom: "0" }}>Current Shows in {city}</h1>
                        {theatres.map((theatre) => (
                            <Container key={theatre.theatreId}>
                                <TheatreCard key={theatre.theatreId} bgImage="https://th.bing.com/th/id/OIP.OLQ8Q-4LK5AVwpopXV_CTAHaE6?rs=1&pid=ImgDetMain">
                                    <Details>
                                        <h1 style={{ color: '#ffffff' }}>{theatre.theatreName}</h1>
                                        <Description>
                                            {theatre.address.addressLine}, {theatre.address.city}, {theatre.address.state}, {theatre.address.country}
                                        </Description>
                                        <BookTicket onClick={() => { handleShowShows(theatre.theatreId); localStorage.setItem("theatre_id", theatre.theatreId) }}>
                                            <span>Show Movies</span>
                                        </BookTicket>
                                    </Details>
                                </TheatreCard>
                            </Container>
                        ))}
                    </CardContainer>
                ) : (
                    <>
                        <MovieContainer>
                            <MovieDetails movie={data} />
                        </MovieContainer>
                        <h1 style={{ color: '#ffffff', bottom: "0" }}>Current Theatres for Shows in {city}</h1>
                        <CardContainer>
                            {theatre.map((theatre) => (
                                <Container key={theatre.theatre.theatreId}>
                                    <TheatreCard key={theatre.theatre.theatreId} bgImage="https://th.bing.com/th/id/OIP.JubKEkPtN9xdfkGAtzaCkQHaEh?rs=1&pid=ImgDetMain"  >
                                        <Details>
                                            <SubTitle>{theatre.theatre.theatreName}</SubTitle>
                                            <Description>
                                                {theatre.theatre.address.addressLine}, {theatre.theatre.address.city}, {theatre.theatre.address.state}, {theatre.theatre.address.country}
                                            </Description>
                                            <BookTicket onClick={() => { handleShowBooking(theatre.theatre.theatreId); localStorage.setItem("show_id", theatre.showId) }}>
                                                <span>Book Ticket</span>
                                            </BookTicket>
                                        </Details>
                                    </TheatreCard>
                                </Container>
                            ))}
                        </CardContainer>
                    </>
                )
            ) : (
                <NoTheatersMessage>
                    No theaters available in {city}
                </NoTheatersMessage>
            )}
        </>
    )
}

export default Theatre;

const NoTheatersMessage = styled.div`
// background-color:white;
color:white;
margin-top:150px;
margin-bottom:260px;
font-size: 20px;
font-weight:bold;
overflow-y: hidden;
// height:100vh;
`

const CardContainer = styled.div`
background-color: black;
`
const Container = styled.main`
   // min-height: calc(100vh - 70px);
 //   min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
    background-color: black;
    text-align:start;
    border-radius: 10px;
`;

const TheatreCard = styled.div`
  display: flex;
  margin: 5px;
  margin-top: 30px;
  text-align: start;
//   height: 300px; /* Set a fixed height */
  border-radius: 10px;
  overflow: hidden;
  background-image: ${(props) => `url(${props.bgImage})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Details = styled.div`
    // width: 40%;
    padding: 0px 36px 0px;
`;

const SubTitle = styled.div`
    color: rgba(249, 249, 249, 0.6);
    font-size: 35px;
    min-height: 20px;
`;

const Description = styled.div`
    line-height: 1.4;
    font-size: 15px;
    color: rgba(249, 249, 249, 0.8);
    margin-bottom: 25px;
    font-weight: bold;
`;

const BookTicket = styled.button`
    margin-bottom: 30px;
    border-radius: 4px;
    font-size: 15px;
    padding: 0px 24px; 
    display: flex;
    align-items: center;
    height: 40px;
    background: rgba(249, 249, 249, 0.8);
    border: none;
    letter-spacing: 1.8px;
    cursor: pointer;

    &:hover {
        background: rgba(249, 249, 249);
    }
`;

const MovieContainer = styled.div`
    // min-height: calc(100vh - 160px);
    padding: 0 calc(3.5vw + 5px);
    `;
