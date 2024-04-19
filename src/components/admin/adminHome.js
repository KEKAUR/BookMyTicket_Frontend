import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const AdminPageContainer = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 0;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/8f/71/a9/photo1jpg.jpg?w=1200&h=-1&s=1');
  background-size: cover;
  background-position: center;
  z-index: -1;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  z-index: 1;
`;

const Card = styled.div`
  width: 18rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: transform 0.2s ease;
  font-weight: bold;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
  }
`;

const LogoutButton = styled.div`
  position: absolute;
  top: 20px;
  right: 100px; 
  background-color: #fff;
  color: black;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const AdminPage = () => {
  
  const navigate  = useNavigate();
  const handleCardClick = (path) => {
    window.location.href = path;
  };

  
  const handleLogOut = ()=>{
    localStorage.removeItem("role");
    localStorage.removeItem("user_id");
    navigate("/");  
    window.location.reload();
    toast.success("Logout Successful");
  }

  return (
    <>
      <AdminPageContainer>
        <LogoutButton onClick={()=>handleLogOut()}>
          Log Out
        </LogoutButton>
        
        <BackgroundImage />
        <CardContainer>
          <Card onClick={() => handleCardClick('/admin/show-movie')}>All Movies</Card>
          <Card onClick={() => handleCardClick('/admin/show-theatre')}>All Theatres</Card>
          <Card onClick={() => handleCardClick('/admin/all-shows')}>All Shows</Card>
        </CardContainer>
      </AdminPageContainer>
    </>
  );
};

export default AdminPage;
