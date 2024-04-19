import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";

const Ticket = () => {
  const location = useLocation();
  const ticketData = location.state.ticketData;

  const [seats, setSeats] = useState(ticketData.seats);
  
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function formatDateString(dateString) {
    const date = new Date(dateString);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();

    let formattedDate = month + " " + day;

    if (day === 1 || day === 21 || day === 31) {
      formattedDate += "st";
    } else if (day === 2 || day === 22) {
      formattedDate += "nd";
    } else if (day === 3 || day === 23) {
      formattedDate += "rd";
    } else {
      formattedDate += "th";
    }

    return formattedDate;
  }

  return (
    <Container>
      <TicketHeader>TICKET DETAILS</TicketHeader>
      <TicketWrapper>
        <LeftSection>
          <ImageWrapper src={ticketData.movieShow.movie.poster} alt="Movie Poster" />
        </LeftSection>
        <RightSection>
          <RightInfoContainer>
            <DateTimeInfo>
              <DateTime>{dayNames[new Date(ticketData.movieShow.
                showDateTime).getDay()]}</DateTime>
              <DateTime>{formatDateString(new Date(ticketData.movieShow.showDateTime))}</DateTime>
              <DateTime>
                {new Date(ticketData.movieShow.showDateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </DateTime>
            </DateTimeInfo>
            <ShowName>
              <h1>{ticketData.movieShow.movie.movieName}</h1>
            </ShowName>

            <TicketID>Ticket ID: {ticketData.ticketId}</TicketID>
            <SeatNumber>
              Seat Number:{" "}
              {seats.map((seat) => seat.seatNumber).join(", ")}
            </SeatNumber>
            <TheatreInfo>
              <span>{ticketData.movieShow.theatre.theatreName}</span>
              <span>
                Address: {ticketData.movieShow.theatre.address.addressLine}, {ticketData.movieShow.theatre.address.city},{" "}
                {ticketData.movieShow.theatre.address.state}, {ticketData.movieShow.theatre.address.country}
              </span>
            </TheatreInfo>
          </RightInfoContainer>
        </RightSection>
      </TicketWrapper>
    </Container>
  );
};

export default Ticket;

const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const TicketHeader = styled.h2`
  padding: 20px;
  margin-bottom: 5px;
  font-size: 24px;
  //color: #333;
  color: white; 
  text-align: center;
`;

const TicketWrapper = styled.div`
  display: flex;
  align-items: center;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

const LeftSection = styled.div`
  display: flex;
`;

const ImageWrapper = styled.img`
  height: 250px;
  width: auto;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0;
`;

const RightInfoContainer = styled.div`
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ShowName = styled.div`
  text-align: center;
  h1 {
    font-size: 24px;
    margin: 0;
    padding: 5px;
  }
`;

const DateTimeInfo = styled.div`
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  padding: 5px 0;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35vw;
`;

const DateTime = styled.span`
  padding: 5px;
`;

const TheatreInfo = styled.div`
  text-align: center;
  span {
    display: block;
  }
  display: flex;
  border-top: 1px solid gray;
  width: 35vw;
  justify-content: space-between;
  padding: 10px;
  font-size: 12px;
`;

const TicketID = styled.p`
  margin: 0;
  color: gray;
  font-size: 14px;
`;

const SeatNumber = styled.p`
  margin: 0;
  color: gray;
  padding: 5px;
  font-size: 14px;
`;
