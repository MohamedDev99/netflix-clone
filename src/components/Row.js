import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import axiosInstance from "../APIs/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setMovieId } from "../features/useMovie";
import { Loading } from ".";

export default function Row({ title, fetchDataUrl, isLargeRow, RTL }) {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: true,
        useTransform: true,
        cssEase: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
        arrows: false,
        rtl: RTL ? true : false,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                },
            },
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const imgBaseUrl = "https://images.tmdb.org/t/p/original/";
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData(url) {
            const request = await axiosInstance.get(url);
            setMovies(request.data.results);
        }
        fetchData(fetchDataUrl);
    }, [fetchDataUrl]);

    const moviesSlider =
        movies &&
        movies.map((movie, index) => (
            <ImagesSlider
                key={index}
                movieId={movie.id}
                image={`${imgBaseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
                title={movie?.title || movie?.name || movie?.original_name || "Joker"}
                isLargeImg={isLargeRow ? "300px" : "250px"}
            />
        ));

    return (
        <MainRow>
            <RowTitle>{title}</RowTitle>
            <RowFrame>
                <Carousel {...settings} carouselHeight={isLargeRow ? "400px" : "330px"}>
                    {moviesSlider}
                </Carousel>
            </RowFrame>
        </MainRow>
    );
}

function ImagesSlider({ movieId, image, alt, title, isLargeImg }) {
    const dispatch = useDispatch();

    // ? function for resize descreption
    const cutDesc = (text, n) => {
        return text.length > n ? text.slice(1, n) + " ..." : text;
    };

    return (
        <Wrap onClick={() => dispatch(setMovieId({ id: movieId }))}>
            {image ? <RowImg src={image} alt={alt} isLargeRow={isLargeImg} /> : <Loading />}
            <RowTitle fs="clamp(0.7rem, 1vw, .9rem)" mb="0.7rem">
                {cutDesc(title, 10)}
            </RowTitle>
        </Wrap>
    );
}

const MainRow = styled.div`
    margin: 2rem 2rem;
    @media (max-width: 600px) {
        margin: 1rem;
    }
`;

const Carousel = styled(Slider)`
    width: 95%;
    height: ${({ carouselHeight }) => carouselHeight};
    margin: 0.5rem auto 0;
    align-items: center;
    .slick-list {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .slick-track {
        display: flex;
        align-items: center;
        gap: 2.2rem;
    }
`;
const RowTitle = styled.h2`
    color: var(--body-bg);
    font-size: ${({ fs }) => (fs ? fs : "clamp(0.79rem, 2vw, 1.3rem)")};
    font-family: "Roboto";
    font-weight: 700;
    letter-spacing: 0.18rem;
    text-transform: uppercase;
    margin-bottom: ${({ mb }) => (mb ? mb : "0")};
`;
const Wrap = styled(motion.div)`
    height: 100%;
    width: 100%;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    transition: all 250ms ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.1);
        border: 2px solid var(--red-dark);
        ${RowTitle} {
            color: var(--red-dark);
        }
    }
`;
const RowFrame = styled.div`
    padding: 1.4rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    .flex {
        display: flex;
    }
`;
const RowImg = styled.img`
    width: 100%;
    height: ${({ isLargeRow }) => isLargeRow};
    object-fit: cover;
    border-radius: 8px 8px 0 0;
`;
