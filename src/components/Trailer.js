import styled from "styled-components/macro";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovie, setMovie } from "../features/useMovie";
import axiosInstance from "../APIs/axios";
import toast from "react-hot-toast";
import { Loading, PopUpMessage } from ".";

export default function Trailer() {
    const [trailerId, setTrailerId] = useState(null);
    const [loading, setLoading] = useState(false);

    const callTrailer = async function fetchData(id) {
        await axiosInstance
            .get(`/movie/${id}/videos?api_key=23517fc10cdd60bba34303c2b32628d2&language=en-US`)
            .then((r) => {
                if (!(!Array.isArray(r.data.results) || !r.data.results.length)) {
                    console.log(r.data.results[0].key);
                    setLoading(true);
                    setTrailerId(r.data.results[0].key);
                    onOpen();
                } else {
                    console.log("No trailer");
                    onClose();
                    return toast((t) => <PopUpMessage message="No trailer" toastId={t.id} />, {
                        style: { backgroundColor: "var(--red-dark)" },
                        duration: 4000,
                    });
                }
            })
            .catch((error) => {
                console.log("error : ", error);
                onClose();
                return toast((t) => <PopUpMessage message="No trailer" toastId={t.id} />, {
                    style: { backgroundColor: "var(--red-dark)" },
                    duration: 4000,
                });
            });
    };

    // * get all details about a trailer
    const dispatch = useDispatch();
    const getTrailer = useSelector(getMovie);
    const [selectTrailer, setSelectTrailer] = useState(null);
    const [hide, setHide] = useState(false);
    const onOpen = () => {
        setHide(true);
        setTimeout(() => setLoading(false), 1000);
    };
    const onClose = () => setHide(false);

    const handleHideVideo = () => {
        setHide((hide) => !hide);
    };

    useEffect(() => {
        if (getTrailer) {
            setSelectTrailer(getTrailer);
            callTrailer(getTrailer.id);
            dispatch(setMovie(null));
        }
        // eslint-disable-next-line
    }, [getTrailer]);

    return (
        <MainTrailer onClick={handleHideVideo} display={hide ? "flex" : "none"}>
            {loading ? (
                <Loading />
            ) : (
                <VideoDetails>
                    <VideoTrailer>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${trailerId}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    </VideoTrailer>
                    <VideoTitle>
                        {selectTrailer?.title || selectTrailer?.name || selectTrailer?.original_name}
                    </VideoTitle>
                    <VideoDate>{selectTrailer?.release_date}</VideoDate>
                    <VideoDescription>{selectTrailer?.overview}</VideoDescription>
                </VideoDetails>
            )}
        </MainTrailer>
    );
}

const MainTrailer = styled.section`
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: ${({ display }) => display};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.9);
    overflow: scroll;
`;
const VideoDetails = styled.div`
    width: 70%;
    max-width: 1100px;
    margin: 0 auto;
    color: var(--red-dark);
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    letter-spacing: 0.12rem;
    font-family: "Inconsolata";
    font-size: clamp(1rem, 2vw, 1.3rem);
    @media (max-width: 600px) {
        width: 90%;
    }
`;
const VideoTitle = styled.h2``;
const VideoDate = styled.h3`
    margin-top: -0.5rem;
`;
const VideoTrailer = styled.div`
    margin-top: 2rem;
    width: 100%;
    height: 400px;
    iframe {
        width: 100%;
        height: 100%;
    }
`;
const VideoDescription = styled.p`
    font-family: "Roboto Mono";
    font-size: clamp(0.85rem, 2vw, 1rem);
    line-height: 1.6;
    color: var(--body-bg);
`;
