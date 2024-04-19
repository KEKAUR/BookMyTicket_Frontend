import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUser, FaMobileAlt, FaEnvelope } from 'react-icons/fa'; // Import icons
import { Api_url } from '../../auth/auth';

const Container = styled.section`
  height: 100vh;
  background-image: url('https://c8.alamy.com/comp/2GFN0FF/vintage-cinema-sketchy-seamless-pattern-retro-film-background-vector-illustration-2GFN0FF.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  
`;

const ProfileContainer = styled.div`
  display: flex;
  padding: 0 1rem;
`;

const ProfileCard = styled.div`
  flex: 1;
  margin-right: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const AvatarCard = styled(ProfileCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: linear-gradient(to right bottom, #f2003c, #000000);
`;

const AvatarImage = styled.img`
  width: 150px;
  border-radius: 50%;
  margin-bottom: 1rem;
  object-fit: cover;
`;

const Username = styled.h5`
  margin: 0;
  font-size: 1.5rem;
  font-family: Georgia, serif;
  font-weight: bold;
  color: #fff;
`;

const DisplayCard = styled(ProfileCard)`
  padding: 1.5rem;
  background:white;
`;

const DisplayHeading = styled.h2`
  margin-bottom: 1rem;
  color: #333;
  font-family: Georgia, serif;
`;

const DisplayForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the left */
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Icon = styled.span`
  font-size: 1.5rem;
  margin-right: 1rem;
`;

const DetailContent = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
`;

const DetailHeading = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: bold;
`;

const DetailData = styled.span`
  margin-top: 0.5rem;
  font-size: 1rem;
`;


const PersonalProfile = () => {

  const [userData, setUserData] = useState();

  const profileData = () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${Api_url}users/${localStorage.getItem("user_id")}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUserData(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    profileData();
  }, [])

  return (
    <Container>
      <ProfileContainer>
        {userData && ( // Render only if userData is defined
          <AvatarCard>
            <AvatarImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp" alt="Avatar" />
            <Username>Hey, {userData.userName}</Username>
          </AvatarCard>
        )}
        {userData && ( // Render only if userData is defined
          <DisplayCard>
            <DisplayHeading>User Details</DisplayHeading>
            <DisplayForm>
              <DetailItem>
                <Icon><FaUser /></Icon>
                <DetailContent>
                  <DetailHeading>Full Name</DetailHeading>
                  <DetailData>{userData.userName}</DetailData>
                </DetailContent>
              </DetailItem>
              <DetailItem>
                <Icon><FaMobileAlt /></Icon>
                <DetailContent>
                  <DetailHeading>Mobile</DetailHeading>
                  <DetailData>{userData.phone}</DetailData>
                </DetailContent>
              </DetailItem>
              <DetailItem>
                <Icon><FaEnvelope /></Icon>
                <DetailContent>
                  <DetailHeading>Email</DetailHeading>
                  <DetailData>{userData.email}</DetailData>
                </DetailContent>
              </DetailItem>
            </DisplayForm>
          </DisplayCard>
        )}
      </ProfileContainer>
    </Container>
  );

};

export default PersonalProfile;
