import styled from "styled-components/macro";
import { Accordion, Footer, Header, Jumbotron } from "../components";
import jumboData from "../fixtures/jumbo.json";

function Home() {
    return (
        <Main>
            <Header />
            <Jumbotron jumboData={jumboData} />
            <Accordion />
            <Footer />
        </Main>
    );
}

export default Home;

const Main = styled.main`
    overflow: scroll;
    height: 100vh;
`;
