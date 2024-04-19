import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Api_url } from '../../auth/auth';
import TheatreModal from './theatreModal';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import TheatreUpdateModal from './TheatreUpdateModal';


const TheatreListPage = () => {
  const [theatres, setTheatres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdateModal, setUpadteShowModal] = useState(false);
  const [selectedTheatre, setselectedTheatre] = useState(null);
  const navigate = useNavigate();

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
        setTimeout(() => setIsLoading(false), 1000);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getTheatre()
  }, []);

  const handleDeleteTheatre = (theatreId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${Api_url}theatres/${theatreId}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Theatre deleted successfully");
          getTheatre();
        }
        toast.error(response);
        return response.json();
      })
      .then((result) => {
        // console.log(result);
      })
      .catch((error) => console.error(error));
  };

  const handleUpdateTheatre = (theatreId) => {
    const selectedTheatre = theatres.find(theatres => theatres.theatreId === theatreId);
    // Set the selectedMovie state with the found movie
    setselectedTheatre(selectedTheatre);
    // Show the update modal
    setUpadteShowModal(true);
  };

  const handleAddTheatre = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUpadteShowModal(false);
  };

  return (
    <>
      <PageContainer>
        <ContentContainer>
          <Head>
            <Icon>
              <IoIosArrowDropleftCircle onClick={() => navigate(-1)} />
            </Icon>
            <Heading>Theatres </Heading>
          </Head>
          <ButtonContainer>
            <AddButton onClick={handleAddTheatre}>Add Theatre</AddButton>
          </ButtonContainer>
          {isLoading ? (
            <LoaderContainer>
             <ThreeDots color='#fff' strokeWidth={10}/>
            </LoaderContainer>
          ) : theatres.length !== 0 ? (
            <TheatreTable>
              {theatres.map((theatre) => (
                <TheatreItem key={theatre.theatreId}>
                  <TheatreDetails>
                    <TheatreName>{theatre.theatreName}</TheatreName>
                    <TheatreName>Capacity - {theatre.capacity}</TheatreName>
                    <TheatreAddress>{theatre.address.addressLine}, {theatre.address.city}, {theatre.address.state}, {theatre.address.country}</TheatreAddress>
                  </TheatreDetails>
                  <Actions>
                    <DeleteButton onClick={() => handleDeleteTheatre(theatre.theatreId)}>Delete</DeleteButton>
                    <UpdateButton onClick={() => handleUpdateTheatre(theatre.theatreId)}>Update</UpdateButton>
                  </Actions>
                </TheatreItem>
              ))}
            </TheatreTable>
          ) : (
            <NotAvailable>No Theatre Available</NotAvailable>
          )}
        </ContentContainer>
      </PageContainer>
      {showModal && <TheatreModal onClose={handleCloseModal} getTheatre={() => getTheatre()} setLoading={setIsLoading} />}
      {showUpdateModal && selectedTheatre && <TheatreUpdateModal onClose={handleCloseModal} getTheatre={() => getTheatre()} setLoading={setIsLoading} theatreId={selectedTheatre.theatreId} 
        theatreData={selectedTheatre} />}
    </>
  );
};

const Icon = styled.div`
  cursor: pointer;
  font-size: 35px;
  &:hover {
    transform: translateY(-3px);
    // box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    color: white;
  }
`

const Head = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
  color: white;
`

const Heading = styled.div`
  font-size: 40px;
  font-family: "Jersey 20", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: white;

`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust height as needed */
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url('https://img.caixin.com/2019-09-24/1569325142337971.jpg');
  background-size: cover;
  background-repeat: no-repeat;
`;

const NotAvailable = styled.div`
  font-weight: bold;
  color: red;
  text-align: center;
`

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  padding-top: 70px;
    border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

`;

const TheatreTable = styled.div``;

const TheatreItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.5);
`;

const TheatreDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  text-align: left;
  padding: 10px;
  margin-bottom: 10px;
`;

const TheatreName = styled.span`
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const TheatreAddress = styled.span`
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
  background-color: #36d7b7;
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

export default TheatreListPage;
