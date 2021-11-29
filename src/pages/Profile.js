import { signOut } from "@firebase/auth";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { getUser } from "../features/userSlice";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const navigate = useNavigate();

    // * get all details about a user
    const user = useSelector(getUser);

    // ? is a function for filter a photo url comming from firebase
    const userPicFilter = (userPic) => {
        if (!isNaN(userPic)) {
            return `/images/misc/${userPic}.png`;
        }
        return userPic;
    };

    // ? function for sign out
    const signOutHandler = () => {
        signOut(auth)
            .then(() => {
                navigate("/", { replace: true });
                return toast.success("Success");
            })
            .catch((error) => {
                // An error happened.
            });
    };

    return (
        <MainProfile>
            <NavBar>
                <Link to="/home">
                    <Logo src="/images/misc/logo.svg" alt="" />
                </Link>
                <NavBarRight>
                    {/* <UserProfile>
                        <UserPic
                            onClick={() => navigate("/profile")}
                            src={
                                user.userProfilePic
                                    ? userPicFilter(user.userProfilePic)
                                    : "/images/users/1.png"
                            }
                            alt={user.userName}
                        />
                    </UserProfile> */}
                </NavBarRight>
            </NavBar>
            <ProfileInfo>
                <h1>Edit Profile</h1>
                <ProfileDetails>
                    <img
                        src={user.userProfilePic ? userPicFilter(user.userProfilePic) : "/images/users/1.png"}
                        alt={user.userName}
                    />
                    <UserDetails>
                        <UserEmail>{user.userEmail ? userPicFilter(user.userEmail) : "userEmail"}</UserEmail>
                        <UserPlans>
                            <h3>Plans</h3>
                            <DatePlan>Renewal date : 10/11/2021</DatePlan>
                            <Subscribe planName="Netflix Basic" planQuality="480p" />
                            <Subscribe planName="Netflix Standrad" planQuality="1080p" />
                            <Subscribe planName="Netflix Premium" planQuality="4K + HDR" />
                        </UserPlans>
                        <SignOut
                            whileHover={{
                                opacity: 1,
                            }}
                            whileTap={{
                                scale: 0.85,
                            }}
                            onClick={signOutHandler}>
                            Sign Out
                        </SignOut>
                    </UserDetails>
                </ProfileDetails>
            </ProfileInfo>
        </MainProfile>
    );
}

function Subscribe({ isSubscribed, planName, planQuality }) {
    return (
        <Plan>
            <PlanName className="Hover">
                <span>{planName}</span>
                <p>{planQuality}</p>
            </PlanName>
            <PlanSubscription
                className="Hover"
                whileTap={{
                    scale: 0.85,
                }}>
                Subscribe
            </PlanSubscription>
        </Plan>
    );
}

const MainProfile = styled.div`
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
    width: 100%;
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
const Logo = styled.img`
    max-width: 150px;
    width: 100%;
    min-width: 80px;
`;
const ProfileInfo = styled.div`
    letter-spacing: 0.15rem;
    color: var(--body-bg);
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-top: 4%;
    width: 50%;
    gap: 0.7rem;
    min-width: 800px;
    margin-bottom: 3rem;
    h1 {
        font-size: clamp(1.35rem, 3vw, 3rem);
        font-weight: 500;
        border-bottom: 2px solid var(--grey-700);
        padding-bottom: 0.3rem;
    }
    @media (max-width: 900px) {
        max-width: 800px;
        width: 90%;
        min-width: 0;
    }
`;
const ProfileDetails = styled.div`
    display: flex;
    gap: 2rem;
    flex: 1;
    img {
        height: 100px;
        object-fit: cover;
    }
    @media (max-width: 600px) {
        flex-direction: column;
    }
`;
const UserDetails = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
const UserEmail = styled.h2`
    background-color: var(--grey-500);
    padding: 0.7rem 1rem;
    font-weight: 400;
    font-size: clamp(0.8rem, 2vw, 1.3rem);
`;
const UserPlans = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    h3 {
        padding: 0.6rem;
        border-bottom: 1px solid var(--grey-700);
    }
`;
const SignOut = styled(motion.div)`
    background-color: var(--red-dark);
    padding: 0.7rem 1rem;
    text-align: center;
    cursor: pointer;
    border-radius: 8px;
    opacity: 0.9;
    margin-top: 1rem;
`;

const DatePlan = styled.p`
    font-size: clamp(0.7rem, 2vw, 1.1rem);
    color: var(--blue-500);
`;
const Plan = styled.div`
    padding: 0.7rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    font-size: clamp(0.7rem, 2vw, 1rem);
    &:hover {
        .Hover {
            opacity: 1.1;
            span,
            p {
                color: var(--orange-light);
            }
        }
    }
    @media (max-width: 350px) {
        padding: 0.7rem 0;
    }
`;

const PlanName = styled.div`
    opacity: 0.8;
    span {
        font-weight: 500;
    }
    p {
        margin-top: 0.3rem;
        font-size: clamp(0.7rem, 1vw, 0.9rem);
        color: var(--green);
    }
`;
const PlanSubscription = styled(motion.div)`
    background-color: var(--red-dark);
    padding: 0.7rem 1.5rem;
    cursor: pointer;
    opacity: 0.8;
    border-radius: 8px;
`;
