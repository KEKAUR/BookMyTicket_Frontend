import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ShowTimingModal from './showModal';
import { Api_url } from '../../auth/auth';
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';
import ShowUpdatedModal from './ShoUpdatedModal';

const ShowListPage = () => {
  const [shows, setShows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setUpadteShowModal] = useState(false)
  const [selectedShow, setselectedShow] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const formatDateTime = (dateTimeStr) => {
    const dateObj = new Date(dateTimeStr);
    const date = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const time = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return { date, time };
  };

  const getShows = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${Api_url}shows`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTimeout(() => setIsLoading(false), 2000);
        const currentDate = new Date();
        const formattedShows = result
          .map((show) => {
            const { date, time } = formatDateTime(show.showDateTime);
            return { ...show, formattedDateTime: { date, time }, dateTime: new Date(show.showDateTime) };
          })
          .filter((show) => show.dateTime >= currentDate); // Filter only current date and upcoming shows
        setShows(formattedShows);
      })
      .catch((error) => console.error(error));
  }


  useEffect(() => {
    getShows()
  }, []);

  const handleDeleteShow = (showId) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${Api_url}shows/${showId}`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Show deleted successfully");
          getShows();
        }
        toast.error(response);
        return response.json();
      })
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const handleUpdateShow = (showId) => {
    const selectedShow = shows.find(shows => shows.showId === showId);
    // Set the selectedShow state with the found movie
    setselectedShow(selectedShow);
    // Show the update modal
    setUpadteShowModal(true);
  };

  const handleAddShow = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <PageContainer>
      <ContentContainer>
        <Head>
          <Icon>
            <IoIosArrowDropleftCircle onClick={() => navigate(-1)} />
          </Icon>
          <Heading>Shows</Heading>
        </Head>
        <ButtonContainer>
          <AddButton onClick={handleAddShow}>Add Show</AddButton>
        </ButtonContainer>
        {isLoading ? (
          <LoaderContainer>
            <ThreeDots color='#fff' strokeWidth={10} />
          </LoaderContainer>
        ) : shows.length !== 0 ? (
          <ShowTable>
            {shows.map((show) => (
              <ShowItem key={show.showId}>
                <ShowDetails>
                  <ShowDate><span style={{ fontWeight: 'bold' }}>Date -</span> {show.formattedDateTime.date} </ShowDate>
                  <ShowTime ><span style={{ fontWeight: 'bold' }}>Time -</span> {show.formattedDateTime.time}</ShowTime>
                </ShowDetails>
                <ShowName><span style={{ fontWeight: 'bold' }}>Show -</span> {show.movie.movieName}</ShowName>
                <Actions>
                  <DeleteButton onClick={() => handleDeleteShow(show.showId)}>Delete</DeleteButton>
                  {/* <UpdateButton onClick={() => handleUpdateShow(show.showId)}>Update</UpdateButton> */}
                </Actions>
              </ShowItem>
            ))}
          </ShowTable>
        ) : (
          <NotAvailable>No Shows Available</NotAvailable>
        )}
      </ContentContainer>
      {showModal && <ShowTimingModal onClose={handleCloseModal} getShows={() => getShows()} setLoading={setIsLoading} />}
    </PageContainer>
  );
};

const Icon = styled.div`
cursor:pointer;
font-size:35px;
color:white;
&:hover {
  transform: translateY(-3px);
  // box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  
}
`
const Head = styled.div`
width:55%;
display: flex;
justify-content: space-between;
`

const Heading = styled.div`
font-size:50px;
// font-weight:bold;
font-family: "Jersey 20", sans-serif;
font-weight: 400;
font-style: normal;
color:white;
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust height as needed */
`;

const NotAvailable = styled.div`
font-weight:bold;
color: red;
text-align:center;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

`;

const ShowDetails = styled.div`
  display: flex;
  flex-direction:column;
  align-items: left ;
  text-align:left;
  // justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  

`;
const ShowTime = styled.span`
margin-top:3px;
  font-size: 18px;
`;
const ShowDate = styled.span`
// margin-top:3px;
  font-size: 18px;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  padding-top: 70px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  background-image: url('https://static.wixstatic.com/media/6910a6_06f5019a5a884d9d93925bae7f81ffb7~mv2.jpg');
  background-size: cover; 
  
  background-position: center;
  padding-top:20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const ShowTable = styled.div``;

const ShowItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const ShowName = styled.span`
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

export default ShowListPage;
