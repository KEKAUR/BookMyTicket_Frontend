import React, { useState } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: ${({ open }) => (open ? 'block' : 'none')};
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    max-width: 90%;
    width: 500px;
    z-index: 999;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #0C4160;
    padding: 30px 10px;
`;

const Card = styled.div`
    max-width: 500px;
    margin: auto;
    color: black;
    border-radius: 20px;
`;

const Heading = styled.p`
    font-size: 30px;
    font-weight: 800;
    text-align: center;
`;

const Button = styled.button`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background-image: linear-gradient(to right, #77A1D3 0%, #79CBCA 51%, #77A1D3 100%);
    border: none;
    transition: 0.5s;
    background-size: 200% auto;

    &:hover {
        background-position: right center;
        color: #fff;
        text-decoration: none;
    }
`;

const ArrowIcon = styled.span`
    transform: ${({ hover }) => (hover ? 'translate(15px)' : 'translate(0)')};
    transition: transform 0.2s ease-in;
`;

const Input = styled.input`
    color: white;
    background-color: #223c60;
    border: 2px solid transparent;
    height: 60px;
    padding-left: 20px;
    vertical-align: middle;

    &:focus {
        background-color: #0c4160;
        border: 2px solid #2d4dda;
        box-shadow: none;
    }
`;

const Text = styled.p`
    font-size: 14px;
    font-weight: 600;
`;

const PaymentFormModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Container>
            <Button onClick={toggleModal}>Open Modal</Button>
            <Overlay open={isOpen}>
                <ModalContainer>
                    <Card>
                        <Heading>Payment Details</Heading>
                        <div className="row gx-3">
                            <div className="col-12">
                                <div className="d-flex flex-column">
                                    <Text className="mb-1">Person Name</Text>
                                    <Input className="form-control mb-3" type="text" placeholder="Name" value="Barry Allen" />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="d-flex flex-column">
                                    <Text className="mb-1">Card Number</Text>
                                    <Input className="form-control mb-3" type="text" placeholder="1234 5678 435678" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex flex-column">
                                    <Text className="mb-1">Expiry</Text>
                                    <Input className="form-control mb-3" type="text" placeholder="MM/YYYY" />
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d-flex flex-column">
                                    <Text className="mb-1">CVV/CVC</Text>
                                    <Input className="form-control mb-3 pt-2 " type="password" placeholder="***" />
                                </div>
                            </div>
                            <div className="col-12">
                                <Button className="btn btn-primary mb-3">
                                    <span className="ps-3">Pay $243</span>
                                    <ArrowIcon className="fas fa-arrow-right" hover={false} />
                                </Button>
                            </div>
                        </div>
                    </Card>
                </ModalContainer>
            </Overlay>
        </Container>
    );
};

export default PaymentFormModal;
