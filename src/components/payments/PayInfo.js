import React, { useState } from 'react';
import styled from 'styled-components';

const PaymentPage = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <Container>
            <PaymentForm>
                <PaymentTitle>Payment Details</PaymentTitle>
                <FormGroup>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input type="text" id="cardNumber" placeholder="Enter card number" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input type="text" id="expiryDate" placeholder="MM/YYYY" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input type="text" id="cvv" placeholder="Enter CVV" />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="name">Name on Card</Label>
                    <Input type="text" id="name" placeholder="Enter name on card" />
                </FormGroup>
                <SubmitButton type="submit" onClick={toggleModal}>Pay Now</SubmitButton>
            </PaymentForm>
            {showModal && (
                <ModalContainer>
                    <ModalContent>
                        <ModalTitle>Select Payment Method</ModalTitle>
                        <ButtonGroup>
                            <ModalButton onClick={toggleModal}>Credit/Debit Card</ModalButton>
                            <ModalButton onClick={toggleModal}>UPI</ModalButton>
                        </ButtonGroup>
                    </ModalContent>
                </ModalContainer>
            )}
        </Container>
    );
}

export default PaymentPage;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const PaymentForm = styled.form`
    width: 400px;
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PaymentTitle = styled.h2`
    margin-bottom: 20px;
    text-align: center;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    font-size: 16px;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #0056b3;
    }
`;

const ModalContainer = styled.div`
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
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
`;

const ModalTitle = styled.h2`
    text-align: center;
    margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ModalButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
        background-color: #0056b3;
    }
`;
