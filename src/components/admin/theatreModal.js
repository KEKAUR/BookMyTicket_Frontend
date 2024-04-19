import React, { useState } from 'react';
import styled from 'styled-components';
import { Api_url } from '../../auth/auth';
import { toast } from 'react-toastify';

const TheatreModal = ({ onClose, getTheatre, setLoading }) => {
  const [formData, setFormData] = useState({
    theatreName: '',
    capacity: '',
    address: {
      country: "",
      state: "",
      city: "",
      addressLine: "",
      theatres: {},
      user: {}
    }
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (name === 'country' || name === 'state' || name === 'city' || name === 'addressLine') {
        return {
          ...prevData,
          address: {
            ...prevData.address,
            [name]: value,
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (!formData.theatreName || !formData.capacity || !formData.address.country || !formData.address.state || !formData.address.city || !formData.address.addressLine) {
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

    fetch(`${Api_url}theatres/`, requestOptions)
      .then((response) => {
        if (response.status === 201) {
          toast.success("Theatre updated successfully");
          getTheatre();
        }
        toast.error(response);
        return response.json();
      })
      .then((result) =>
        console.log(result))
      .catch((error) => console.error(error));
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h3>Add Theatre</h3>
          <CloseButton onClick={onClose}>X</CloseButton>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <InputField type="text" name="theatreName" placeholder="Theatre Name" value={formData.theatreName} onChange={handleChange} required />
            <InputField type="number" name="capacity" placeholder="Capacity" value={formData.capacity} onChange={handleChange} required />
            <InputField type="text" name="country" placeholder="Country" value={formData.address.country} onChange={handleChange} required />
            <InputField type="text" name="state" placeholder="State" value={formData.address.state} onChange={handleChange} required />
            <InputField type="text" name="city" placeholder="City" value={formData.address.city} onChange={handleChange} required />
            <InputField type="text" name="addressLine" placeholder="address" value={formData.address.addressLine} onChange={handleChange} required />
          </ModalBody>
          <SubmitButton type="submit">Add Theatre</SubmitButton>

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
  border-radius: 10px;
  width: 400px; /* Adjust width as needed */
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
  padding: 8px ;
  border: 1px solid #ccc;
  border-radius: 5px;

`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding:2px 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export default TheatreModal;
