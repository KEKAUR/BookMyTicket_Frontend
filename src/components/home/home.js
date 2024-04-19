import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from './slider/slider'
import MoviesList from './movies_list/movies_list'
import { ThreeDots } from 'react-loader-spinner'


function Home() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
    }, []);



    return (
        <>
            <Container>
                {isLoading ? (

                    <LoaderContainer>
                        <ThreeDots color='#fff' strokeWidth={10} />
                    </LoaderContainer>
                ) : (
                    <>
                        <Slider />
                        <MoviesList />
                    </>
                )}
            </Container>
        </>
    );
}

export default Home

const Container = styled.main`
    min-height: calc(100vh - 70px);
    padding: 0 calc(3.5vw + 5px);
    position: relative;
    overflow-x: hidden;
    background-color: black; /* Set background color to black */

    &:before {
        background: url("/images/home-background.png") center center / cover no-repeat fixed;
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
    }
`

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  strokeWidth: '40px'
`;
