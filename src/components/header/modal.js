import React from "react";
import styled from "styled-components";

function Modal({ isOpen, closeModal }) {
  const indianCities = [
    { city: "Mumbai", imageSrc: "/images/mumbai.avif" },
    { city: "Delhi", imageSrc: "/images/ncr.avif" },
    { city: "Bangalore", imageSrc: "/images/bang.png" },
    { city: "Kolkata", imageSrc: "/images/kolk.avif" },
    { city: "Chennai", imageSrc: "/images/chen.avif" },
    // { city: "Hyderabad", imageSrc: "/images/hyd.png" },
    // { city: "Ahmedabad", imageSrc: "/images/ahd.avif" },
    // { city: "Pune", imageSrc: "/images/pune.png" },
    // { city: "Chandigarh", imageSrc: "/images/koch.avif" },
    // { city: "Kochi", imageSrc: "/images/chd.avif" },
  ];

  const handleChange = (city) => {
    closeModal();
    window.location.reload();
    // Navigate to the new city's route
    window.location.href = `/theatres/${city}`;
  };


  function CityList({ cities }) {
    return (
      <div style={{ display: "flex" }}>
        {cities.map((city, index) => (
          <div key={index} onClick={() => handleChange(city.city)} style={{ cursor: "pointer", margin: "2px" }}>
            <img src={city.imageSrc} width={70} alt="cinema icon" />
            <span style={{ color: "#000000" }}>{city.city}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ModalContainer isOpen={isOpen}>
      {" "}
      <ParentDiv>
        <EmptyDiv onClick={closeModal}></EmptyDiv>
        <ModalContent>
          <div style={{ marginBottom: "1rem" }}>
            <CloseButton onClick={closeModal}>X</CloseButton>
            <span style={{ fontSize: "24px", fontWeight: "700" }}>
              Select a City
            </span>
          </div>
          <FlexContainer>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CityList cities={indianCities} />
            </div>
          </FlexContainer>
        </ModalContent>
      </ParentDiv>
    </ModalContainer>
  );
}


export default Modal;

const ParentDiv = styled.div`
  overflow: hidden;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100vw;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  align-items: center;
  justify-content: center;
`;
const EmptyDiv = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  align-items: center;
  justify-content: center;
  left: 0;
  background: #252424cc;
  height: 100%;
  width: 100vw;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "block" : "none")};
  z-index: 1001;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  height: auto;
  overflow: auto;
  width: 60vw;
  overflow-x: hidden;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1.8rem;
  right: 12px;
  font-size: 16px;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  margin-bottom: 0.7rem;
`;
