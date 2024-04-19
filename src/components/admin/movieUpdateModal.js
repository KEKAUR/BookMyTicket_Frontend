import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Api_url } from '../../auth/auth';
import { toast } from 'react-toastify';

const MovieUpdateModal = ({ onClose, getMovies, setLoading, movieId, movieData }) => {
    const [formData, setFormData] = useState({
        movieName: '',
        ticketBasePrice: 0,
        plot: '',
        director: '',
        rating: '',
        genres: '',
        poster: '',
        language: '',
        trailer: '',
    });

    useEffect(() => {
        if (movieData) {
            setFormData(movieData);
        }
    }, [movieData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleUpdateMovie = (e) => {

        e.preventDefault();

        if (!formData.movieName || !formData.ticketBasePrice || !formData.director || !formData.genres || !formData.language || !formData.plot || !formData.poster || !formData.rating || !formData.trailer) {
            toast.error('All fields are required');
            return;
        }

        setTimeout(() => setLoading(true), 1000);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

        const raw = JSON.stringify(formData);

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch(`${Api_url}movies/${movieId}`, requestOptions)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Movie Updated successfully");
                    getMovies();
                }
                toast.error(response);
                return response.json();
            })
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
        onClose();
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h3>Update Movie</h3>
                    <CloseButton onClick={onClose}>X</CloseButton>
                </ModalHeader>
                <form onSubmit={handleUpdateMovie}>
                    <ModalBody>
                        <InputField type="text" name="movieName" placeholder="Movie Name" value={formData.movieName} onChange={handleChange} required />
                        <InputField type="number" name="ticketBasePrice" placeholder="Ticket Base Price" value={formData.ticketBasePrice} onChange={handleChange} required />
                        <InputField type="text" name="plot" placeholder="Plot" value={formData.plot} onChange={handleChange} required />
                        <InputField type="text" name="director" placeholder="Director" value={formData.director} onChange={handleChange} required />
                        <InputField type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} required />
                        <InputField type="text" name="genres" placeholder="Genres" value={formData.genres} onChange={handleChange} required />
                        <InputField type="text" name="poster" placeholder="Poster URL" value={formData.poster} onChange={handleChange} required />
                        <InputField type="text" name="language" placeholder="Language" value={formData.language} onChange={handleChange} required />
                        <InputField type="text" name="trailer" placeholder="Trailer URL" value={formData.trailer} onChange={handleChange} required />
                    </ModalBody>
                    <SubmitButton type="submit">Upadte Movie</SubmitButton>
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
  border-radius: 10px; /* Square shape */
  width: 500px; /* Increased width */
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

const InputField = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 1px 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export default MovieUpdateModal;
