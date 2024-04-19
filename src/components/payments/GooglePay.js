import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';

const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 20px;
`;

const Button = styled.button`
  font-size: 18px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #3e8e41;
  }
`;

const UPIContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const UPIImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.2);
  margin-bottom: 20px;
`;

const UPILink = styled.a`
  font-size: 24px;
  color: #4CAF50;
  text-decoration: none;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-10px);
  }
`;

const MovieTicketAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Lottie options={defaultOptions} height={400} width={400} />
  );
};

const PaymentPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle payment submission here
  }

  return (
    <PaymentContainer>
      <h1>Payment Page</h1>
      <PaymentForm onSubmit={handleSubmit}>
        <Label htmlFor="cardName">Card Name</Label>
        <Input type="text" id="cardName" name="cardName" />

        <Label htmlFor="cardNumber">Card Number</Label>
        <Input type="text" id="cardNumber" name="cardNumber" />

        <Label htmlFor="expirationDate">Expiration Date</Label>
        <Input type="text" id="expirationDate" name="expirationDate" />

        <Label htmlFor="securityCode">Security Code</Label>
        <Input type="text" id="securityCode" name="securityCode" />

        <Button type="submit">Pay</Button>
      </PaymentForm>

      <UPIContainer>
        <UPIImage src="https://cdn-icons-png.flaticon.com/512/1259/1259922.png" alt="UPI Icon" />
        <UPILink href="upi://pay?pa=gpay@yourdomain&pn=Your%20Name&tn=Movie%20Ticket%20Payment&am=1000" target="_blank" rel="noopener noreferrer">
          Pay with GPay
        </UPILink>
        <UPILink href="upi://pay?pa=phonepe@yourdomain&pn=Your%20Name&tn=Movie%20Ticket%20Payment&am=1000" target="_blank" rel="noopener noreferrer">
          Pay with PhonePe
        </UPILink>
        <UPILink href="upi://pay?pa=paytm@yourdomain&pn=Your%20Name&tn=Movie%20Ticket%20Payment&am=1000" target="_blank" rel="noopener noreferrer">
          Pay with PayTM
        </UPILink>
      </UPIContainer>
    </PaymentContainer>
  );
}

const PaymentPageWithAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PaymentPage />
    </motion.div>
  );
};

export default PaymentPageWithAnimation;