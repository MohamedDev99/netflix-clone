import styled from "styled-components/macro";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieId, setMovieId } from "../features/useMovie";
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
    const getTrailer = useSelector(getMovieId);
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
        console.log(getTrailer);
        if (getTrailer) {
            callTrailer(getTrailer);
            dispatch(setMovieId({ id: "" }));
        }
    }, [getTrailer]);

    return (
        <MainTrailer onClick={handleHideVideo} display={hide ? "flex" : "none"}>
            {loading ? (
                <Loading src="/images/users/1.png" />
            ) : (
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
    background-color: rgba(0, 0, 0, 0.7);
`;

const VideoTrailer = styled.div``;
