import React, { useState } from "react";
import styled from "styled-components/macro";
import { OptForm } from ".";
import faqsData from "../fixtures/faqs.json";

function Accordion() {
    return (
        <MainAccordion>
            <Container>
                <Title>Frequently Asked Questions </Title>
                <Frame>
                    {faqsData &&
                        faqsData.map((item) => <Item key={item.id} header={item.header} body={item.body} />)}
                </Frame>
            </Container>
            <OptForm />
        </MainAccordion>
    );
}

function Item({ header, body }) {
    const [isShowing, setIsShowing] = useState(false);
    const handleShow = () => {
        setIsShowing((isShowing) => !isShowing);
    };

    return (
        <ItemContainer>
            <Header>
                <HeaderTitle>{header}</HeaderTitle>
                {isShowing ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={handleShow}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={handleShow}>
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                )}
            </Header>
            {isShowing && <Body>{body}</Body>}
        </ItemContainer>
    );
}

export default Accordion;

const MainAccordion = styled.div`
    border-bottom: 8px solid #222;
    padding: 1rem 0;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1rem;
    max-width: 900px;
    margin: 0 auto 1rem;
    @media (max-width: 900px) {
        margin: 0 1rem;
    }
`;
const Title = styled.h1`
    color: var(--body-bg);
    font-size: clamp(1.2rem, 2vw, 2.3rem);
    letter-spacing: 0.19rem;
    font-weight: 600;
    margin-bottom: 0.7rem;
    line-height: 1.5;
`;
const Frame = styled.div`
    margin: 1rem 0;
`;
const ItemContainer = styled.div`
    margin-bottom: 0.7rem;
    border: 2px solid var(--grey-400);
    background-color: var(--grey-900);
    padding: 0.4rem 1.2rem;
    border-radius: 10px;
`;
const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--body-bg);
    svg {
        width: 24px;
        height: 24px;
        @media (max-width: 600px) {
            width: 16px;
        }
    }
`;
const HeaderTitle = styled.h1`
    font-size: clamp(0.7rem, 1.2vw, 1.15rem);
    letter-spacing: 0.19rem;
    font-weight: 500;
`;
const Body = styled.div`
    font-size: clamp(0.7rem, 1vw, 1rem);
    font-family: "Roboto Mono";
    letter-spacing: 0.12rem;
    line-height: 1.3;
    color: var(--grey-400);
    margin-bottom: 0.5rem;
`;
