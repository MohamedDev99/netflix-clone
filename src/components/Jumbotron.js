import styled from "styled-components/macro";
export default function Jumbotron({ jumboData }) {
    return (
        <MainJumbotron>
            {jumboData &&
                jumboData.map((item) => (
                    <Container direction={item.direction} key={item.id}>
                        <Position>
                            <Title>{item.title}</Title>
                            <SubTitle>{item.subTitle}</SubTitle>
                        </Position>
                        <Position>
                            <Image src={item.image} alt={item.alt} />
                        </Position>
                    </Container>
                ))}
        </MainJumbotron>
    );
}

// * styled Jumbotron
const MainJumbotron = styled.div``;

// * styled Container
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${({ direction }) => direction};
    justify-content: space-between;
    max-width: 1100px;
    margin: auto;
    width: 100%;
`;

// * styled Position
const Position = styled.div`
    width: 50%;
`;

// * styled Title
const Title = styled.h1`
    font-size: clamp(1rem, 4.5vw, 3rem);
    line-height: 1.1;
    margin-bottom: 0.5rem;
`;

// * styled SubTitle
const SubTitle = styled.h3`
    font-size: clamp(0.5rem, 3vw, 1.5rem);
`;

// * styled Image
const Image = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: contain;
`;
