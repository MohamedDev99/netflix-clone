import React from "react";
import styled from "styled-components/macro";

function Footer() {
    return (
        <Container>
            <Title>Questions ? Contact us</Title>
            <Break />
            <Row>
                <Column>
                    <Link href="#">FAQ</Link>
                    <Link href="#">Investor Relations</Link>
                    <Link href="#">Ways to Watch</Link>
                    <Link href="#">Coporate Informations</Link>
                    <Link href="#">Netflix Originals</Link>
                </Column>
                <Column>
                    <Link href="#">Help Center</Link>
                    <Link href="#">Jobs</Link>
                    <Link href="#">Terms of Use</Link>
                    <Link href="#">Contact Us</Link>
                </Column>
                <Column>
                    <Link href="#">Accounts</Link>
                    <Link href="#">Redeem Gift Cards</Link>
                    <Link href="#">Privacy</Link>
                    <Link href="#">Speed Test</Link>
                </Column>
                <Column>
                    <Link href="#">Media Center</Link>
                    <Link href="#">buy Gift Cards</Link>
                    <Link href="#">Cookie Preferences</Link>
                    <Link href="#">Legal Notices</Link>
                </Column>
            </Row>
            <Break />
            <Text>Netflix United Kingdom</Text>
        </Container>
    );
}

export default Footer;

const Container = styled.div`
    display: flex;
    padding: 3rem 2.3rem;
    justify-content: center;
    margin: auto;
    max-width: 1100px;
    flex-direction: column;
    @media (max-width: 1000px) {
        padding: 2.7rem 2rem;
    }
`;
const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 0.7rem;
    @media (max-width: 950px) {
        grid-template-columns: repeat(2, minmax(100px, 1fr));
    }
    @media (max-width: 450px) {
        grid-template-columns: repeat(1, minmax(100px, 1fr));
        grid-gap: 0.3rem;
    }
`;
const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: start;
`;
const Link = styled.a`
    color: var(--grey-400);
    margin-bottom: 1.2rem;
    font-size: clamp(0.7rem, 0.9vw, 1rem);
    letter-spacing: 0.12rem;
    text-decoration: none;
    font-family: "Roboto Mono";
`;
const Title = styled.p`
    font-size: clamp(1rem, 2vw, 1.7rem);
    font-weight: 600;
    color: var(--body-bg);
    margin-bottom: 2.7rem;
    letter-spacing: 0.14rem;
`;
const Text = styled(Title)`
    margin-top: 0.5rem;
    font-size: clamp(0.9rem, 1vw, 1.3rem);
    letter-spacing: 0.22rem;
`;

const Break = styled.p`
    flex-basis: 100%;
    height: 0;
`;
