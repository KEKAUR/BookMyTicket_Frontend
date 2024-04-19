import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Api_url } from '../../auth/auth';
import { toast } from 'react-toastify';

const ShowUpdatedModal = ({ onClose, setLoading, getShows }) => {
  const [showDate, setShowDate] = useState(new Date());
  const [showTime, setShowTime] = useState(new Date());
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedTheatre, setSelectedTheatre] = useState('');

  const handleDateChange = (date) => {
    setShowDate(date);
  };

  const handleTimeChange = (time) => {
    setShowTime(time);
  };

  const getTheatre = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${Api_url}theatres/`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTheatres(result)
      })
      .catch((error) => console.error(error));
  }

  const getMovies = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${Api_url}movies`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setMovies(result);
      })
      .catch((error) => console.error(error));
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const hours = showTime.getHours();
    const minutes = showTime.getMinutes();
  
    // Setting the date and time using showDate and the extracted hours/minutes
    const showDateTime = new Date(
      showDate.getFullYear(),
      showDate.getMonth(),
      showDate.getDate(),
      hours,
      minutes
    );
  
    // Formatting showDateTime to ISO string without timezone conversion
    const formattedShowDateTime = showDateTime.toISOString();
    
    setTimeout(() => setLoading(true), 1000);
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");
  
    const raw = JSON.stringify({
      "showDateTime": formattedShowDateTime,
      "movieId": selectedMovie,
      "theatreId": selectedTheatre
    });
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    fetch("http://localhost:3333/api/shows/", requestOptions)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Show creted successfully");
          getShows();
        }
        toast.error(response);
        return response.json();
      })
      // .then((result) => console.log(result))
      .catch((error) => console.error(error));
    onClose();
  };

  useEffect(() => {
    getMovies();
    getTheatre();
  }, []);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h3 >Add Show </h3>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Label>Date:</Label>
            <DatePicker selected={showDate} onChange={handleDateChange} />
            <Label>Time:</Label>
            <DatePicker
              selected={showTime}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              dateFormat="h:mm aa"
              timeCaption="Time"
            />
            <Label>Select Movie:</Label>
            {/* <InputFields> */}
            <SelectField value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)}>
              <option value="">Select a movie</option>
              {movies.map(movie => (
                <option key={movie.movieId} value={movie.movieId}>{movie.movieName}</option>
              ))}
            </SelectField>
            {/* </InputFields> */}
            <Label>Select Theatre:</Label>
            <SelectField value={selectedTheatre} onChange={(e) => setSelectedTheatre(e.target.value)}>
              <option value="">Select a theatre</option>
              {theatres.map(theatre => (
                <option key={theatre.theatreId} value={theatre.theatreId}>{theatre.theatreName}</option>
              ))}
            </SelectField>
          </ModalBody>
          <SubmitButton type="submit">Add</SubmitButton>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const SubmitButton = styled.button`
margin-top:5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const SelectField = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px;
`;

const StyledDatePicker = styled(DatePicker)`
  & .react-datepicker__input-container {
    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }

  & .react-datepicker__time-container {
    .react-datepicker__time {
      .react-datepicker__time-box {
        .react-datepicker__time-list {
          .react-datepicker__time-item {
            &:hover,
            &.react-datepicker__time-item--selected {
              background-color: #007bff;
              color: white;
            }
          }
        }
      }
    }
  }
`;

export default ShowUpdatedModal;
