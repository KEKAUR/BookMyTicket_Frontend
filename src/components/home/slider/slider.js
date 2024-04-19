import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { Api_url } from "../../../auth/auth";

function Slide() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const myHeaders = new Headers();
      // myHeaders.append("Authorization", "Basic QWFrYXNoOnF3ZXJ0");

      const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
      };

      fetch(`${Api_url}movies`, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            // setLoading(false);
              setData(result);
          })
          .catch((error) => console.error(error));
    };
    getData();
  }, []);
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div>
      {/* {loading ? ( 
        // <Loader>
        //   <Circles
        //     height="80"
        //     width="80"
        //     color="white"
        //     ariaLabel="circles-loading"
        //     wrapperStyle={{}}
        //     wrapperClass=""
        //     visible={true}
        //   />
        // </Loader>
      ) : (*/}
        <Carousel {...settings}>
          {data.slice(0, 5).map((movie) => (
            
              <StyleSlide key = {movie.movieId} poster = {movie.poster}>
              <Wrap>
                <div
                  style={{
                    display: "flex",
                        flexDirection: "column",
                        // alignContent: "flex-start",
                        textAlign: "left",
                        paddingLeft: "10px",
                        // color: "white",
                        // fontWeight: "bold",
                        // widows: "120px",
                        
                  }}
                >
                  <h2>{movie.movieName}</h2>
                  <p>{movie.rating}</p>
                  <p>{movie.language}</p>
                  <p style={{ widows: "120px" }}>{movie.genre}</p>
                  <p style={{ widows: "120px" }}>{movie.plot}</p>
                </div>
                <div style={{zIndex:99}}>
                <Link key={movie.movieId} to={`/movie/${movie.movieId}`}>
                  <img
                    src={movie.poster}
                    alt={movie.movieName}
                    style={{ height: "250px", opacity: 1 }}
                  />
                  </Link>
                </div>
              </Wrap>
              </StyleSlide>
            
          ))}
        </Carousel>
      {/* )} */}
    </div>
  );
}

export default Slide;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%; /* Set the height to occupy the entire container */
`;

const Carousel = styled(Slider)`
margin: 0 auto;
  padding: 0;
 // margin-top: 70px;
 box-sizing border-box
color rgb(33, 37, 41)
color-scheme light
display inline
font-family Poppins, sans-serif
font-size 16px
font-weight 400
height 210px
line-height 24px
margin-bottom 0px
margin-left 0px
margin-right 0px
margin-top 0px
max-width 100%
object-fit cover
overflow-clip-margin content-box
overflow-x hidden
overflow-y hidden
padding-bottom 0px
padding-left 0px
padding-right 0px
padding-top 0px
text-align start
text-size-adjust 100%
user-select none
vertical-align middle
width 506px
-webkit-tap-highlight-color rgba(0, 0, 0, 0)`

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  color: white;
  justify-content: space-around;
  
  p {
    color: white;
    margin : 5px;
    width: 50%;
    
  }

  //   img {
  //     border-radius: 4px;
  //     box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
  //       rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  //     cursor: pointer;
  //     display: block;
  //     padding: 4px;
  //   }

  //   &:hover {
  //     padding: 0;
  //     border: 4px solid rgba(249, 249, 249, 0.8);
  //     transition-duration: 300ms;
  //   }
`;

const StyleSlide = styled.div`
    position: relative;
    width: 90vw;
    height: 100%;
    overflow: hidden;
    
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: ${(props) => `url(${props.poster})`};
      background-size: cover;
      background-position: center;
      filter: opacity(0.3); /* Adjust the transparency as needed */
      z-index: 0;
    }
  
`;
