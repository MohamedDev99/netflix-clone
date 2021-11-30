import { useNavigate } from "react-router";
import styled from "styled-components/macro";

function OptForm() {
    const navigate = useNavigate();

    return (
        <MainOptForm>
            <Container>
                <InputField type="text" placeholder="Email Address" />
                <SubmitField onClick={() => navigate("/signin")}>Try it now</SubmitField>
            </Container>
            <Text>Ready to watch ? enter your email to create or restart your membership</Text>
        </MainOptForm>
    );
}

export default OptForm;

const MainOptForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem 0;
`;
const Container = styled.div`
    display: flex;
    justify-content: center;
    width: 90%;
    font-family: "Inconsolata";
    height: 3.5rem;
    @media (max-width: 1000px) {
        height: 3rem;
    }
    @media (max-width: 840px) {
        height: 2.5rem;
    }
    @media (max-width: 600px) {
        height: 100%;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
`;
const InputField = styled.input`
    outline: none;
    letter-spacing: 0.15rem;
    font-size: clamp(0.8rem, 2vw, 1.4rem);
    padding: 0 1rem;
    border: none;
    border-radius: 3px 0 0 3px;
    max-width: 450px;
    width: 100%;
    @media (max-width: 600px) {
        height: 2.5rem;
    }
`;
const SubmitField = styled.button`
    border: none;
    max-width: 172px;
    width: 100%;
    display: inline-block;
    padding: 0 1rem;
    color: var(--body-bg);
    background-color: rgb(247, 8, 28);
    font-size: clamp(0.8rem, 2vw, 1.4rem);
    letter-spacing: 0.12rem;
    font-family: "Inconsolata";
    border-radius: 0 3px 3px 0;
    cursor: pointer;
    text-transform: uppercase;
    @media (max-width: 600px) {
        height: 2.5rem;
    }
`;
const Text = styled.p`
    color: var(--grey-400);
    letter-spacing: 0.12rem;
    text-align: center;
    font-size: clamp(0.7rem, 1vw, 1.1rem);
    width: 90%;
    margin-bottom: 1rem;
    @media (max-width: 800px) {
        line-height: 1.4;
    }
`;
