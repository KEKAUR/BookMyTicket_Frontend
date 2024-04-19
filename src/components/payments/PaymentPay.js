import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const PaymentPay = () => {

    const location = useLocation();
    const ticketData = location.state.ticketData;
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [selectedCardType, setSelectedCardType] = useState('');
    const [selectedUPI, setSelectedUPI] = useState('');
    const [cardDetailsVisible, setCardDetailsVisible] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [nameOnCard, setNameOnCard] = useState('');

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };

    const handleCloseModal = () => {
        handleModalToggle();
        navigate(`/ticket`, { state: { ticketData: ticketData } }); // Redirect to /ticket page
    };

    const handleCardTypeSelection = (e) => {
        const cardType = e.target.value;
        setSelectedCardType(cardType);
        // If no card type is selected, hide the card details
        setCardDetailsVisible(cardType !== '');
    };

    const handleUPISelection = (e) => {
        setSelectedUPI(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate input fields before submitting
        if (
            selectedCardType === 'debit' || selectedCardType === 'credit'
                ? (cardNumber && expiryDate && cvv && nameOnCard)
                : selectedUPI
        ) {
            // Proceed with payment
            handleModalToggle();
        } else {
            toast.error('Please fill all required fields.');
        }
    };

    return (
        <Container>
            <PaymentForm onSubmit={handleSubmit}>
                <PaymentTitle>Payment Details</PaymentTitle>
                <FormGroup>
                    <Label htmlFor="cardType">Select Card Type</Label>
                    <Select id="cardType" onChange={handleCardTypeSelection}>
                        <option value="">Choose Card Type</option>
                        <option value="debit">Debit Card</option>
                        <option value="credit">Credit Card</option>
                    </Select>
                </FormGroup>
                {cardDetailsVisible && (
                    <>
                        <FormGroup>
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                                type="text"
                                id="cardNumber"
                                placeholder="Enter card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <Input
                                type="text"
                                id="expiryDate"
                                placeholder="MM/YYYY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                                type="text"
                                id="cvv"
                                placeholder="Enter CVV"
                                value={cvv}
                                onChange={(e) => setCVV(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="name">Name on Card</Label>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Enter name on card"
                                value={nameOnCard}
                                onChange={(e) => setNameOnCard(e.target.value)}
                            />
                        </FormGroup>
                    </>
                )}
                <FormGroup>
                    <Label htmlFor="upiService">Select UPI Service</Label>
                    <Select id="upiService" onChange={handleUPISelection}>
                        <option value="">Choose UPI Service</option>
                        <option value="paytm">Paytm</option>
                        <option value="phonepe">PhonePe</option>
                        <option value="gpay">Google Pay</option>
                        <option value="cred">CRED UPI</option>
                    </Select>
                </FormGroup>
                <SubmitButton type="submit">Pay Now</SubmitButton>
            </PaymentForm>
            {showModal && (
                <ModalOverlay>
                    <Modal>
                        <ModalContent>
                            <h2>Payment Successful!</h2>
                            <p>Payment done using {selectedCardType.toUpperCase()} {selectedCardType === '' ? '' : 'Card and'} {selectedUPI.toUpperCase()}!</p>
                            <CloseButton onClick={handleCloseModal}>Close</CloseButton>
                        </ModalContent>
                    </Modal>
                </ModalOverlay>
            )}
        </Container>
    );
}

export default PaymentPay;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`
const PaymentForm = styled.form`
    width: 400px;
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const PaymentTitle = styled.h2`
    margin-bottom: 20px;
    text-align: center;
`

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

const Select = styled.select`
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

const Modal = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
`;

const ModalContent = styled.div`
    text-align: "center";
`;

const CloseButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: "#0056b3";
    }
`
