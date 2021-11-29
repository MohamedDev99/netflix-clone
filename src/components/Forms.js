import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PopUpMessage } from ".";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from "@firebase/auth";
import { auth, provider } from "../firebase-config";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userState } from "../features/userSlice";
import animated from "../animation/Animated";

export default function Forms({ signUpForm = false }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // ? for signIn form
    const notifyErrorIn = () => {
        if (errors.email && errors.password) {
            return toast((t) => <PopUpMessage message="please Fill all Fields" toastId={t.id} />, {
                style: { backgroundColor: "var(--red-dark)" },
                duration: 4000,
            });
        } else if (errors.email) {
            return toast((t) => <PopUpMessage message={errors.email?.message} toastId={t.id} />, {
                style: { backgroundColor: "var(--red-dark)" },
                duration: 4000,
            });
        } else if (errors.password) {
            return toast((t) => <PopUpMessage message={errors.password?.message} toastId={t.id} />, {
                style: { backgroundColor: "var(--red-dark)" },
                duration: 4000,
            });
        }
    };
    // ? for signUp form
    const notifyErrorUp = () => {
        const lengthObj = Object.keys(errors).length;
        if (lengthObj === 3 || lengthObj === 2) {
            if (
                (errors.email && errors.password && errors.repeatPassword) ||
                (errors.email && errors.password) ||
                (errors.email && errors.repeatPassword)
            ) {
                return toast((t) => <PopUpMessage message="please Fill all Fields" toastId={t.id} />, {
                    style: { backgroundColor: "var(--red-dark)" },
                    duration: 4000,
                });
            }
        } else if (lengthObj === 1) {
            if (errors.email) {
                return toast((t) => <PopUpMessage message={errors.email?.message} toastId={t.id} />, {
                    style: { backgroundColor: "var(--red-dark)" },
                    duration: 4000,
                });
            } else if (errors.password) {
                return toast((t) => <PopUpMessage message={errors.password?.message} toastId={t.id} />, {
                    style: { backgroundColor: "var(--red-dark)" },
                    duration: 4000,
                });
            } else if (errors.repeatPassword) {
                return toast(
                    (t) => <PopUpMessage message={errors.repeatPassword?.message} toastId={t.id} />,
                    {
                        style: { backgroundColor: "var(--red-dark)" },
                        duration: 4000,
                    }
                );
            }
        }
    };

    // * authentication Sign In
    const signIn = async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user);
                dispatch(
                    userState({
                        isLogged: true,
                        name: result.user.displayName,
                        email: result.user.email,
                        profilePic: result.user.photoURL,
                    })
                );
                toast.success("Successfully Login!");
                navigate("/home");
            })
            .catch((error) => {
                if (error.code === "auth/wrong-password") {
                    return toast((t) => <PopUpMessage message="Please check the Password" toastId={t.id} />, {
                        style: { backgroundColor: "var(--red-dark)" },
                        duration: 4000,
                    });
                }
                if (error.code === "auth/user-not-found") {
                    return toast((t) => <PopUpMessage message="Please check the Email" toastId={t.id} />, {
                        style: { backgroundColor: "var(--red-dark)" },
                        duration: 4000,
                    });
                }
                console.log(error.message);
            });
    };

    // * authentication Sign Up
    const signUp = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                updated(email.split("@")[0], userCredential.user);
            })
            .catch((error) => {
                console.log(error.message);
                if (error.code === "auth/email-already-in-use") {
                    return toast((t) => <PopUpMessage message="Email Already in Use" toastId={t.id} />, {
                        style: { backgroundColor: "var(--red-dark)" },
                        duration: 4000,
                    });
                }
            });
    };

    // * update user profile
    const updated = async (name, user) => {
        await updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: Math.floor(Math.random() * 5) + 1,
        })
            .then(() => {
                console.log("its updated");
                dispatch(
                    userState({
                        isLogged: true,
                        name: user.displayName,
                        email: user.email,
                        profilePic: user.photoURL,
                    })
                );
                toast.success("Successfully creating your account");
                navigate("/signin");
            })
            .catch((error) => {
                return toast((t) => <PopUpMessage message={error.message} toastId={t.id} />, {
                    style: { backgroundColor: "var(--red-dark)" },
                    duration: 4000,
                });
            });
    };

    // * login with google
    const loginWidthGoogle = async () => {
        await signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result.user);
                dispatch(
                    userState({
                        isLogged: true,
                        name: result.user.displayName,
                        email: result.user.email,
                        profilePic: result.user.photoURL,
                    })
                );
                toast.success("Successfully creating your account");
                navigate("/home");
            })
            .catch((error) => {
                console.log(error.message);
                return toast((t) => <PopUpMessage message={error.message} toastId={t.id} />, {
                    style: { backgroundColor: "var(--red-dark)" },
                    duration: 4000,
                });
            });
    };

    // * get a valid Form
    const onSubmit = (data) => {
        if (data) {
            signUpForm ? signUp(data.email, data.password) : signIn(data.email, data.password);
        }
    };

    const ani = animated[Math.floor(Math.random() * animated.length)];
    return (
        <MainForm>
            <Frame
                initial={ani}
                animate={{
                    scale: 1,
                    x: 0,
                    y: 0,
                }}
                transition={{
                    duration: 0.5,
                }}>
                <Title>{signUpForm ? "Sign Up" : "Sign In"}</Title>
                <FormsInputs onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="email"
                        placeholder="your email ..."
                        {...register("email", {
                            required: "please write your email ..",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Please enter a valid email",
                            },
                        })}
                    />
                    <input
                        type="password"
                        placeholder="your password ..."
                        {...register("password", {
                            required: "please write your password ..",
                            minLength: {
                                value: 8,
                                message: "must you password be 8 character or more",
                            },
                        })}
                    />
                    {signUpForm && (
                        <input
                            type="password"
                            placeholder="repeat your password ..."
                            {...register("repeatPassword", {
                                required: "please repeat your password ..",
                                minLength: {
                                    value: 8,
                                    message: "must you password be 8 character or more",
                                },
                            })}
                        />
                    )}
                    <SubmitBTN
                        onClick={signUpForm ? notifyErrorUp : notifyErrorIn}
                        whileTap={{
                            scale: 0.85,
                        }}>
                        {signUpForm ? "Sign Up" : "Sign In"}
                    </SubmitBTN>
                </FormsInputs>
                <Bar>
                    <hr />
                    <span>Or</span>
                    <hr />
                </Bar>
                <GoogleSignIn onClick={loginWidthGoogle}>
                    <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="" />
                    <span>Login with Google</span>
                </GoogleSignIn>
                <Text>
                    <p>
                        {signUpForm ? "already have an account ? " : " New to Netflix ? "}
                        <span>
                            <Link to={signUpForm ? "/signin" : "/signup"}>
                                {signUpForm ? "Sign in now." : "Sign up now."}
                            </Link>
                        </span>
                    </p>
                    <p>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
                </Text>
            </Frame>
        </MainForm>
    );
}

const MainForm = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Frame = styled(motion.div)`
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.7);
    gap: 1.5rem;
    border-radius: 12px;
    width: clamp(180px, 100%, 400px);
    @media (max-width: 500px) {
        margin: 0 1rem;
    }
`;
const Title = styled.h1`
    width: 100%;
    margin: 0;
    color: var(--body-bg);
    letter-spacing: 0.1rem;
    font-weight: 500;
    font-size: clamp(1.2rem, 2vw, 1.8rem);
`;
const FormsInputs = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    input {
        width: clamp(160px, 100%, 100%);
        height: 38px;
        outline: none;
        padding: 0.6rem 1rem;
        border: none;
        border-radius: 10px;
        font-size: clamp(0.85rem, 2vw, 0.9rem);
        background-color: #333;
        color: var(--body-bg);
        border: 2px solid transparent;
        letter-spacing: 0.12rem;
        transition: border background-color 250ms ease-in-out;
        &:focus {
            border: 2px solid var(--body-bg);
            background-color: var(--grey-600);
        }
        @media (min-width: 800px) {
            height: 45px;
        }
    }
`;
const SubmitBTN = styled(motion.button)`
    width: 100%;
    height: 38px;
    background-color: var(--red-dark);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    letter-spacing: 0.2rem;
    font-size: clamp(0.75rem, 2vw, 0.95rem);
    color: var(--body-bg);
    margin-top: 1rem;
`;
const Text = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 0.7rem;
    p {
        font-size: clamp(0.75rem, 2vw, 1rem);
        font-family: "Inconsolata";
        line-height: 1.3;
        letter-spacing: 0.07rem;
        color: var(--grey-500);
        a {
            text-decoration: none;
            color: var(--body-bg);
            font-weight: 700;
        }
    }
`;

const Bar = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    hr {
        height: 1px;
        width: 40%;
        background-color: var(--grey-700);
        border: none;
    }
    span {
        color: var(--body-bg);
        letter-spacing: 0.12rem;
    }
`;

const GoogleSignIn = styled.div`
    margin-top: -0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background-color: var(--body-bg);
    width: 100%;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    img {
        width: clamp(17px, 100%, 25px);
    }
    span {
        color: var(--grey-500);
        letter-spacing: 0.12rem;
        font-size: clamp(0.75rem, 2vw, 0.9rem);
        font-weight: 500;
        @media (max-width: 340px) {
            display: none;
        }
    }
    @media (max-width: 650px) {
        padding: 0.4rem 0.7rem;
    }
`;
