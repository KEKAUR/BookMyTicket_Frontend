import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CondensedMovieDetails from './condensed_movie_details/condensed_movie_details';
import SeatChart from './seat_chart/seat_chart';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Api_url } from '../../auth/auth';
import { IoTicketSharp } from 'react-icons/io5';

function setZoom() {
  if (navigator.appVersion.indexOf('Win') !== -1) {
    document.body.style.zoom = '75%';
  }
}

const Booking = () => {
  const [data, setData] = useState([]);
  const { movie_id } = useParams();
  const [poster, setPoster] = useState('');
  setZoom();

  const theatre_id = localStorage.getItem('theatre_id');
  const show_id = localStorage.getItem('show_id');
  const user_id = localStorage.getItem('user_id');
  const [amount, setAmount] = useState('');
  const [totalBookedSeats, setTotalBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Basic QWFrYXNoOnF3ZXJ0');

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${Api_url}movies/${movie_id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setPoster(result.poster);
      })
      .catch((error) => console.error(error));
  };

  const bookTicket = () => {

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Basic QWFrYXNoOnF3ZXJ0');
    const currentDate = new Date().toISOString().split('T')[0];
    const raw = JSON.stringify({
      theatreId: theatre_id,
      showId: show_id,
      userId: user_id,
      amount: amount,
      purchaseDate: currentDate,
      listSeatId: selectedSeats,
      status: 'Success',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`${Api_url}tickets/book`, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to book ticket');
        }
      })
      .then((data) => {
        // Redirect to the ticket page with the ticket ID
        navigate(`/pay`, { state: { ticketData: data } });
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setAmount(data.ticketBasePrice * selectedSeats.length);
  }, [selectedSeats, data.ticketBasePrice]);

  return (
    <Container>
      <BookingSection>
        <CondensedMovieDetails movie={data} />
        <SeatChart setTotalBookedSeats={setTotalBookedSeats} setParentSelectedSeats={setSelectedSeats} />
      </BookingSection>
      <MoviePoster>
        <Wrap>
          <img src={poster} alt="Movie Poster" />
        </Wrap>
        <TotalAmount>
          {amount !== 0 ? <Amount>Total Amount - ₹{amount}</Amount> : ''}
        </TotalAmount>
        <BookButton>
            <BookTicket onClick={bookTicket} title="Once ticket confirmed there will be no refund">
              <span style={{ fontSize: '25px', marginTop: '5px', marginRight: '10px' }}>
                <IoTicketSharp />
              </span>
              <span>CONFIRM TICKETS</span>
            </BookTicket>
        </BookButton>
      </MoviePoster>
    </Container>
  );
};

export default Booking;

const Container = styled.main`
  min-height: calc(100vh - 140px);
  padding: 0 calc(3.5vw + 5px);
  background: #0c111b;
  position: relative;
  overflow-x: hidden;
  display: flex;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

const Amount = styled.div`
  border-radius: 4px;
  font-size: 25px;
  font-weight: bold;
  padding: 15px 20px;
  background-image: -webkit-linear-gradient(45deg, #ffc107 0%, #f76a35 100%);
  background-image: linear-gradient(45deg, #ffc107 0%, #f76a35 100%);
  border: none;
  letter-spacing: 1.8px;
  margin-top: 30px;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgba(0 0 0 / 69%) 0px 26px 30px -10px;
  color: white;
`;

const BookingSection = styled.div`
  margin-top: 40px;
  height: 100%;
  background: #0c111b;
  border-radius: 10px;
  padding: 10px 30px;

  @media (max-width: 900px) {
    padding: 10px 20px;
    width: 100%;
  }
`;

const MoviePoster = styled.div`
  width: auto;
  margin: 0 auto;
  margin-top: 190px;
`;

const Wrap = styled.div`
  border-radius: 10px;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgba(0 0 0 / 69%) 0px 26px 30px -10px, rgba(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  overflow: hidden;

  img {
    height: 97vh;
    width: auto;
    object-fit: cover;
  }
`;

const BookButton = styled.div`
  margin: 40px 0px;
`;

const BookTicket = styled.button`
  border-radius: 4px;
  font-size: 20px;
  color: white;
  font-weight: bold;
  padding: 15px 20px;
  background-image: -webkit-linear-gradient(45deg, #ffc107 0%, #ff8b5f 100%);
  background-image: linear-gradient(45deg, #ffc107 0%, #ff8b5f 100%);
  border: none;
  letter-spacing: 1.8px;
  cursor: pointer;

  &:hover {
    background-image: -webkit-linear-gradient(45deg, #ffc107 0%, #f76a35 100%);
    background-image: linear-gradient(45deg, #ffc107 0%, #f76a35 100%);
  }

  IoTicketSharp {
    // vertical-align:middle;
    // margin-right:15px;
    // background:white;
  }

  @media (max-width: 900px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const TotalAmount = styled.div``;
