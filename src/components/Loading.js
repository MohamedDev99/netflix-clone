import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { getUser } from "../features/userSlice";

export default function Loading() {
    const user = useSelector(getUser);
    return (
        <MainLoading>
            <Picture src={user.userProfilePic} alt="" />
        </MainLoading>
    );
}

const MainLoading = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    :after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        background-image: url(/images/misc/spinner.png);
        background-size: contain;
        background-repeat: no-repeat;
        margin-top: -150px;
        margin-left: -75px;
        width: 150px;
        height: 150px;
        animation-name: spin;
        animation-duration: 1000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    @-ms-keyframes spin {
        from {
            -ms-transform: rotate(0deg);
        }
        to {
            -ms-transform: rotate(360deg);
        }
    }
    @-moz-keyframes spin {
        from {
            -moz-transform: rotate(0deg);
        }
        to {
            -moz-transform: rotate(360deg);
        }
    }
    @-webkit-keyframes spin {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const Picture = styled.img`
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -22px;
    border-radius: 50%;
`;
