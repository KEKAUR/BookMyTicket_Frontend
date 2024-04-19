import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MovieModal from './movieModal';
import MovieUpdateModal from './movieUpdateModal';
import { Api_url } from '../../auth/auth';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CameraMovie } from '@styled-icons/boxicons-regular/CameraMovie';

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setUpadteShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

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
        setTimeout(() => setIsLoading(false), 2000);
        setMovies(result);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getMovies();
  }, []);

  const handleDeleteMovie = (movieId) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${Api_url}movies/${movieId}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Movie deleted successfully");
          getMovies();
        }
        toast.error(response);
        return response.json();
      })
      .then((result) => {
        setTimeout(() => setIsLoading(false), 2000);
      })
      .catch((error) => console.error(error));
  };

  const handleAddMovie = () => {
    setShowModal(true);
  };

  const handleUpadteMovie = (movieId) => {
    const selectedMovie = movies.find(movie => movie.movieId === movieId);
    // Set the selectedMovie state with the found movie
    setSelectedMovie(selectedMovie);
    // Show the update modal
    setUpadteShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpadteShowModal(false);
  };


  return (
    <PageContainer>
      <ContentContainer>
        <Head>
          <Icon onClick={() => navigate(-1)}>
            <IoIosArrowDropleftCircle />
          </Icon>
          <Heading>
            <CameraIcon />
            Movies
          </Heading>
        </Head>
        <ButtonContainer>
          <AddButton onClick={handleAddMovie}>Add Movie</AddButton>
        </ButtonContainer>
        {isLoading ? (
          <LoaderContainer>
          </LoaderContainer>
        ) : movies.length !== 0 ? (
          <MovieTable>
            {movies.map((movie) => (
              <MovieItem key={movie.movieId}>
                <MovieDetails>
                  <MovieName><span style={{ fontWeight: 'bold' }}>Movie - </span>{movie.movieName}</MovieName>
                  <MovieData><span style={{ fontWeight: 'bold' }}>Rating -</span> {movie.rating} </MovieData>
                  <MovieData ><span style={{ fontWeight: 'bold' }}>Genres -</span> {movie.genres}</MovieData>
                  <MovieData ><span style={{ fontWeight: 'bold' }}>Price -</span> {movie.ticketBasePrice}</MovieData>
                </MovieDetails>
                <Actions>
                  <DeleteButton onClick={() => handleDeleteMovie(movie.movieId)}>Delete</DeleteButton>
                  <UpdateButton onClick={() => handleUpadteMovie(movie.movieId)}>Update</UpdateButton>
                </Actions>
              </MovieItem>
            ))}
          </MovieTable>
        ) : (
          <NotAvailable>No Movie Available</NotAvailable>
        )}
      </ContentContainer>
      {showModal && <MovieModal onClose={handleCloseModal} getMovies={() => getMovies()} setLoading={setIsLoading} />}
      {showUpdateModal && selectedMovie && <MovieUpdateModal onClose={handleCloseModal} getMovies={getMovies} setLoading={setIsLoading} movieId={selectedMovie.movieId} // Pass the movieId
        movieData={selectedMovie} />}
    </PageContainer>
  );
};

const Icon = styled.div`
    cursor: pointer;
    font-size: 35px;
    &:hover {
      transform: translateY(-3px);
    }
  `;

const Head = styled.div`
    width: 55%;
    display: flex;
    justify-content: space-between;
  `;

const MovieDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    padding: 10px;
    margin-bottom: 10px;
  `;

const MovieData = styled.span`
    margin-top: 3px;
    font-size: 18px;
  `;

const Heading = styled.div`
    font-size: 48px; /* Increased font size */
    font-family: "Arial", sans-serif; /* Changed font family */
    font-weight: 700; /* Changed font weight */
    color: white; /* Changed font color */
    display: flex; /* Added to align icon and text */
    align-items: center; /* Added to align icon and text */
  `;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  `;

const NotAvailable = styled.div`
    font-weight: bold;
    color: red;
    text-align: center;
  `;

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  `;

const ContentContainer = styled.div`
    flex: 1;
    padding: 20px;
    padding-top: 70px;
    background-color: rgba(211, 211, 211, 0.6); /* Light grey with transparency */
    background-image: url('https://images.pexels.com/photos/6985127/pexels-photo-6985127.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  `;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  `;

const MovieTable = styled.div``;

const MovieItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-3px);
    }
  `;

const MovieName = styled.span`
    font-size: 18px;
  `;

const Actions = styled.div`
    display: flex;
    align-items: center;
  `;

const Button = styled.button`
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 10px;
  `;

const DeleteButton = styled(Button)`
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  `;

const UpdateButton = styled(Button)`
    background-color: #28a745;

    &:hover {
      background-color: #218838;
    }
  `;

const AddButton = styled.button`
    background-color: black;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 15px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  `;

const CameraIcon = styled(CameraMovie)`
    color: black;
    font-size: 20px; /* Same size as heading */
    margin-right: ; /* Spacing between icon and text */
  `;

export default MovieListPage;
