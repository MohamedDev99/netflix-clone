import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { OptForm } from ".";

function Header() {
    return (
        <MainHeader>
            <NavBar>
                <Link to="/home">
                    <Logo src="/images/misc/logo.svg" alt="Netflix App" />
                </Link>
                <Sign>
                    <Link to="/signin">
                        <SignIn
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{
                                scale: 0.75,
                            }}>
                            Sign In
                        </SignIn>
                    </Link>
                </Sign>
            </NavBar>
            <Frame>
                <SubFrame>
                    <Title>Unlimited films, TV programmes and more</Title>
                    <SubTitle>Watch anywhere, Cancel anytime</SubTitle>
                </SubFrame>
                <OptForm />
            </Frame>
        </MainHeader>
    );
}

export function HeaderContainer({ children, text, link, ...restProps }) {
    return (
        <MainHeader {...restProps}>
            <NavBar>
                <Link to="/">
                    <Logo src="/images/misc/logo.svg" alt="Netflix App" />
                </Link>
                <Sign>
                    <Link to={link}>
                        <SignIn
                            whileHover={{
                                scale: 1.05,
                            }}
                            whileTap={{
                                scale: 0.75,
                            }}>
                            {text}
                        </SignIn>
                    </Link>
                </Sign>
            </NavBar>
            {children}
        </MainHeader>
    );
}

export function HeaderFeature({ children, ...restProps }) {
    return <MainFeature {...restProps}>{children}</MainFeature>;
}

export function HeaderNavBar({ children, ...restProps }) {
    return <NavBar {...restProps}>{children}</NavBar>;
}

export default Header;

const MainHeader = styled.div`
    background: url("/images/misc/home-bg.jpg") top left / cover no-repeat;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: flex-start;
`;

const MainFeature = styled(MainHeader)`
    background: ${({ backgroundImg }) => `url("https://images.tmdb.org/t/p/original/${backgroundImg}")`} top
        center / cover no-repeat;
    height: ${({ Height }) => (Height ? Height : "100vh")};
`;

const NavBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
`;
const Logo = styled.img`
    max-width: 150px;
    width: 100%;
    min-width: 80px;
`;
const Sign = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 0 1.5rem;
    a {
        text-decoration: none;
        font-size: clamp(0.8rem, 2vw, 1rem);
        color: var(--body-bg);
        font-weight: 500;
        letter-spacing: 0.12rem;
        text-align: center;
    }
`;
const SignIn = styled(motion.div)`
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border: 2px solid var(--red-dark);
    background-color: var(--red-dark);
    border-radius: 6px;
    opacity: 0.95;
    &:hover {
        opacity: 1;
    }
    @media (max-width: 600px) {
        padding: 0.5rem;
    }
`;
const Frame = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const SubFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
    letter-spacing: 0.12rem;
`;
const Title = styled.h1`
    font-size: clamp(1rem, 3vw, 2.5rem);
    color: var(--body-bg);
    text-align: center;
`;
const SubTitle = styled.h3`
    font-size: clamp(0.7rem, 1.3vw, 1.5rem);
    text-align: center;
    color: var(--body-bg);
`;
