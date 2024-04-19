import React, { useState, useEffect } from 'react';
import './seat_chart.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Api_url } from '../../../auth/auth';

function SeatChart({ setParentSelectedSeats }) {
  const [seat, setSeat] = useState([]);
  const [seatAvailable, setSeatAvailable] = useState([]);
  const [seatReserved, setSeatReserved] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const theatre_id = localStorage.getItem('theatre_id');

  const onClickData = (seatId) => {
    if (seatReserved.some(res => res.seatId === seatId)) {
      setSeatAvailable([...seatAvailable, seatId]);
      setSeatReserved(seatReserved.filter(res => res.seatId !== seatId));
      setSelectedSeats(prevSelectedSeats => prevSelectedSeats.filter(seat => seat !== seatId));
    } else {
      setSeatReserved([...seatReserved, seatId]);
      setSeatAvailable(seatAvailable.filter(res => res !== seatId));
      setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, seatId]);
    }
  };


  const getSeats = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`${Api_url}seats/theatre/${theatre_id}`, requestOptions);
      const result = await response.json();

      const groupedSeats = [];
      for (let i = 0; i < result.length; i += 10) {
        groupedSeats.push(result.slice(i, i + 10));
      }

      setSeat(groupedSeats);

      const availableSeats = result.filter(seat => !seat.reserved);
      setSeatAvailable(availableSeats);

      const unAvailableSeats = result.filter(seat => seat.reserved);
      setSeatReserved(unAvailableSeats);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSeats();
  }, []);

  useEffect(() => {
    setParentSelectedSeats(selectedSeats);
  }, [selectedSeats, setParentSelectedSeats]);

  return (
    <div>
      <h4>PICK YOUR SEATS</h4>
      <DrawGrid
        seat={seat}
        available={seatAvailable}
        reserved={seatReserved}
        theatreSeats={seat}
        onClickData={onClickData}
        selectedSeats={selectedSeats} // Pass selectedSeats as a prop
        setSelectedSeats={setSelectedSeats}
      />
    </div>
  );
}

function DrawGrid(props) {
  const onClickSeat = (seat) => {
    if (props.reserved.some(res => res.seatId === seat.seatId && res.reserved)) {
      toast.error('This seat is already reserved, please choose another seat.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      if (props.selectedSeats.some(selected => selected === seat.seatId)) {
        // Deselect the seat
        props.setSelectedSeats(prevSelectedSeats => prevSelectedSeats.filter(id => id !== seat.seatId));
      } else {
        // Select the seat
        props.setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, seat.seatId]);
      }
    }
  };
  return (
    <div className="container">
      <table className="grid">
        <tbody>
          {props.seat.map((numList, i) => (
            <tr key={i}>
              {numList.map(seat =>
                <td
                className={
                  seat.reserved ? 'reserved' :
                  props.selectedSeats.includes(seat.seatId) ? 'selected' :
                  'available'
                }
                  key={seat.seatNumber}
                  onClick={() => onClickSeat(seat)}
                >
                  {seat.seatNumber}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default SeatChart;

