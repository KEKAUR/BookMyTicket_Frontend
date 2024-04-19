import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${({ open }) => (open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  padding: 20px;
  max-width: 500px;
  width: 90%;
`;

const Heading = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }

  a {
    margin-left: auto;
    color: #007bff;
    text-decoration: none;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
`;

const AddCardButton = styled.button`
  width: 100%;
  background-color: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const PaymentModal = ({ open, setOpen }) => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCVV] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted:', { name, cardNumber, expiry, cvv });
    setOpen(false);
  };

  return (
    <Overlay open={open}>
      <ModalContainer>
        <Heading>Settings</Heading>
        <Heading>Payment</Heading>
        <CardWrapper>
          <p className="fw-bold mb-4 pb-2">Saved cards:</p>
          <Card>
            <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" />
            <Input
              type="text"
              placeholder="**** **** **** 3193"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <a href="#!">Remove card</a>
          </Card>
          <Card>
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
            <Input
              type="text"
              placeholder="**** **** **** 4296"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <a href="#!">Remove card</a>
          </Card>
        </CardWrapper>
        <p className="fw-bold mb-4">Add new card:</p>
        <Input
          type="text"
          placeholder="Cardholder's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <Input
            type="text"
            placeholder="Expire (MM/YYYY)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <Input
            type="password"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
          />
        </div>
        <AddCardButton onClick={handleSubmit}>Add card</AddCardButton>
      </ModalContainer>
    </Overlay>
  );
};

export default PaymentModal;
