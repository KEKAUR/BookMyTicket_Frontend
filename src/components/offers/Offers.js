import React from 'react';
import styled from 'styled-components';

const Offers = () => {
    return (
        <Container>
            <OfferSection>
                <h2>Your Offers</h2>
                <CardContainer>
                    <Card>
                        <CardImage src="/images/offer.jpg" />
                        <CardBody>
                            <CardTitle>New User</CardTitle>
                            <CardText>Special offer for new users</CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardImage src="/images/offer.jpg" />
                        <CardBody>
                            <CardTitle>New User</CardTitle>
                            <CardText>Special offer for new users</CardText>
                        </CardBody>
                    </Card>
                    {/* Add more cards here if needed */}
                </CardContainer>
            </OfferSection>
        </Container>
    );
}

export default Offers;

const Container = styled.main`
    min-height: calc(100vh - 140px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
`;

const OfferSection = styled.div`
    margin-top: 70px;
    background: #0c111b;
    border-radius: 10px;
    padding: 30px;
    color:white;
    font-family: "Ubuntu", sans-serif;
`;

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center; /* Optional: center cards vertically */
    flex-wrap: wrap; /* Allows cards to wrap to the next line if needed */
    margin-top: 20px;
`;

const Card = styled.div`
    width: 18rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 10px; /* Add some space between cards */
`;

const CardImage = styled.img`
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
`;

const CardBody = styled.div`
    padding: 20px;
`;

const CardTitle = styled.h5`
    margin: 0;
    color: #333;
`;

const CardText = styled.p`
    color: #666;
`;
