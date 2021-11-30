import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { HeaderFeature } from "../components/Header";
// import useContent from "../features/useContent";
import { getUser } from "../features/userSlice";
// import selectionFilter from "../utils/selectionFilter";
import axiosInstance from "../APIs/axios";
import requests from "../APIs/Requests";
import { Footer, Loading, Row, Trailer } from "../components";
import { getMovie, setMovie } from "../features/useMovie";

function Browser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // * get state components { series, films }
    const [selection, setSelection] = useState(false);
    const [movieSelector, setMovieSelector] = useState([]);

    const getData = async function fetchData(baseUrl) {
        const request = await axiosInstance.get(baseUrl);
        setMovieSelector(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]);
    };

    // const getUrl = async function fetchData() {
    //     const request = await axiosInstance.get(requests.fetchAiringTodayTv);
    //     console.log(request.data);
    // };
    // useEffect(() => {
    //     getUrl();
    // });

    useEffect(() => {
        selection ? getData(requests.fetchNetflixOriginalsTv) : getData(requests.fetchNetflixOriginals);
    }, [selection]);

    // * get all details about a user
    const user = useSelector(getUser);
    // const { series } = useContent("series");
    // const { films } = useContent("films");

    // const slides = selectionFilter({ series, films });

    // ? is a function for filter a photo url comming from firebase
    const userPicFilter = (userPic) => {
        if (!isNaN(userPic)) {
            return `/images/misc/${userPic}.png`;
        }
        return userPic;
    };

    // ? function for resize descreption
    const cutDesc = (text, n) => {
        return text.length > n ? text.slice(1, n) + " ..." : text;
    };

    return (
        <MainBrowser>
            <BrowserContainer>
                <HeaderFeature Height="80vh" backgroundImg={movieSelector?.backdrop_path}>
                    <NavBar>
                        <Link to="/">
                            <Logo src="/images/misc/logo.svg" alt="" />
                        </Link>
                        <NavBarRight>
                            <Menu>
                                <MenuItem
                                    whileHover={{
                                        translateY: -5,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                    }}
                                    onClick={() => {
                                        if (selection !== false) {
                                            setSelection(false);
                                        }
                                    }}>
                                    Films
                                </MenuItem>
                                <MenuItem
                                    whileHover={{
                                        translateY: -5,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                    }}
                                    onClick={() => {
                                        if (selection !== true) {
                                            setSelection(true);
                                        }
                                    }}>
                                    Series
                                </MenuItem>
                            </Menu>
                            <UserProfile>
                                <UserPic
                                    onClick={() => navigate("/profile")}
                                    src={
                                        user.userProfilePic
                                            ? userPicFilter(user.userProfilePic)
                                            : "/images/users/1.png"
                                    }
                                    alt=""
                                />
                            </UserProfile>
                        </NavBarRight>
                    </NavBar>
                    {movieSelector?.backdrop_path ? (
                        <FeatureFrame>
                            <FeatureTitle>
                                {movieSelector?.title ||
                                    movieSelector?.name ||
                                    movieSelector?.original_name ||
                                    "Joker"}
                            </FeatureTitle>
                            <FeatureText>
                                {movieSelector?.overview && cutDesc(movieSelector?.overview, 200)}
                            </FeatureText>
                            <FeatureButtons>
                                <FeaturePlayBtn
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    onClick={() => dispatch(setMovie(movieSelector))}>
                                    Play
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </FeaturePlayBtn>
                                <FeatureAddToMyPlayListBtn
                                    whileHover={{
                                        scale: 1.05,
                                    }}>
                                    Add to My PlayList
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                    </svg>
                                </FeatureAddToMyPlayListBtn>
                            </FeatureButtons>
                        </FeatureFrame>
                    ) : (
                        <Loading />
                    )}
                    <FeatureFadeBottom />
                </HeaderFeature>
                {selection ? (
                    <>
                        <Row
                            title="Netflix Originals TV Shows"
                            fetchDataUrl={requests.fetchNetflixOriginalsTv}
                            isLargeRow
                        />
                        <Row title="Trending Now TV Shows" fetchDataUrl={requests.fetchTrendingTv} RTL />
                        <Row title="Top Rated TV Shows" fetchDataUrl={requests.fetchTopRatedTv} />
                        <Row title="Popular TV Shows" fetchDataUrl={requests.fetchPopularTv} RTL />
                        <Row title="On The Air TV Shows" fetchDataUrl={requests.fetchOnTheAirTv} />
                        <Row title="Airing Today TV Shows" fetchDataUrl={requests.fetchAiringTodayTv} RTL />
                    </>
                ) : (
                    <>
                        <Row
                            title="Netflix Originals"
                            fetchDataUrl={requests.fetchNetflixOriginals}
                            isLargeRow
                        />
                        <Row title="Trending Now" fetchDataUrl={requests.fetchTrending} RTL />
                        <Row title="Top Rated" fetchDataUrl={requests.fetchTopRated} />
                        <Row title="Kids Movies" fetchDataUrl={requests.fetchKidsMovies} RTL />
                        <Row title="Action Movies" fetchDataUrl={requests.fetchActionMovies} />
                        <Row title="Comedy Movies" fetchDataUrl={requests.fetchComedyMovies} RTL />
                        <Row title="Horror Movies" fetchDataUrl={requests.fetchHorrorMovies} />
                        <Row title="Romance Movies" fetchDataUrl={requests.fetchRomanceMovies} RTL />
                    </>
                )}
                <Footer />
            </BrowserContainer>
            <Trailer videoId={getMovie} />
        </MainBrowser>
    );
}

export default Browser;

const MainBrowser = styled.div`
    position: relative;
    overflow: scroll;
`;

const BrowserContainer = styled.section`
    height: 100vh;
`;

const NavBar = styled.div`
    padding: 1.5rem;
    display: flex;
    align-items: center;

    /*  animation */
    transition-timing-function: ease-in;
    transition: all 0.5s;
`;
const NavBarRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;
    width: 100%;
    svg {
        width: 24px;
        height: 24px;
        color: var(--orange-light);
        cursor: pointer;
    }
`;

const Menu = styled.ul`
    list-style: none;
    display: flex;
    gap: 2rem;
    font-weight: 500;
    font-size: clamp(0.9rem, 2vw, 1.2rem);
    color: var(--orange-light);
    letter-spacing: 00.14rem;
`;
const MenuItem = styled(motion.li)`
    cursor: pointer;
`;
const UserProfile = styled.div``;
const UserPic = styled.img`
    max-width: 42px;
    width: 100%;
    min-width: 22px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid transparent;
    transition: border 150ms ease-in-out;
    &:hover {
        border: 2px solid var(--body-bg);
    }
`;
const FeatureFrame = styled.div`
    margin: 0 56px;
    padding: 100px 0 330px 0;
    display: flex;
    flex-direction: column;
    align-items: normal;
    gap: 1.65rem;
    height: 100px;
    width: 65%;
    color: var(--body-bg);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
    @media (max-width: 1000px) {
        margin: 0 30px;
        width: 60%;
    }
    @media (max-width: 800px) {
        margin: 0 auto;
        width: 76%;
    }
    @media (max-width: 600px) {
        width: 94%;
    }
`;
const FeatureTitle = styled.h2`
    font-family: "Montserrat";
    font-size: clamp(1.5rem, 3vw, 3rem);
    letter-spacing: 0.12rem;
`;
const FeatureText = styled.p`
    font-family: "Roboto Mono";
    font-size: clamp(0.8rem, 2vw, 1.15rem);
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.14rem;
`;
const FeatureButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;
    @media (max-width: 600px) {
        gap: 1.5rem;
    }
`;
const FeaturePlayBtn = styled(motion.button)`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    padding: 0.85rem 1.2rem;
    border-radius: 10px;
    cursor: pointer;
    letter-spacing: 0.12rem;
    font-size: "Roboto";
    font-weight: 500;
    font-size: clamp(0.7rem, 3vw, 1.1rem);
    transition: all 250ms ease-in-out;
    svg {
        width: 24px;
    }
    &:hover {
        background-color: var(--blue-500);
        color: var(--body-bg);
    }
    @media (max-width: 600px) {
        padding: 0.5rem 0.7rem;
    }
`;
const FeatureAddToMyPlayListBtn = styled(FeaturePlayBtn)``;
const FeatureFadeBottom = styled.div`
    height: 7.4rem;
    background-image: linear-gradient(180deg, transparent, rgba(37, 37, 37, 0.61), #111);
`;
const Logo = styled.img`
    max-width: 150px;
    width: 100%;
    min-width: 80px;
`;

// const ProfileInfo = styled.div``;
// const Title = styled.h1``;
// const List = styled.ul``;
// const Item = styled.li``;
// const Picture = styled.img``;
// const Name = styled.p``;
