import { motion } from "framer-motion";
import styled from "styled-components/macro";

export default function Jumbotron({ jumboData }) {
    const jumbotron = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.5,
            },
        },
    };

    const ItemLeft = {
        hidden: { opacity: 0, x: "70%" },
        show: { x: 0, opacity: 1 },
    };
    const ItemRight = { hidden: { opacity: 0, x: "-70%" }, show: { x: 0, opacity: 1 } };
    return (
        <MainJumbotron variants={jumbotron} initial="hidden" animate="show">
            {jumboData &&
                jumboData.map((item, index) => (
                    <Item variants={index % 2 === 0 ? ItemLeft : ItemRight} key={item.id}>
                        <Container direction={item.direction}>
                            <Position>
                                <Title>{item.title}</Title>
                                <SubTitle>{item.subTitle}</SubTitle>
                            </Position>
                            <Position>
                                <Image src={item.image} alt={item.alt} />
                            </Position>
                        </Container>
                    </Item>
                ))}
        </MainJumbotron>
    );
}

// * styled Item
const Item = styled(motion.div)`
    display: flex;
    border-bottom: 8px solid #222;
    color: white;
    padding: 3.2rem 4%;
    overflow: hidden;
`;

// * styled Jumbotron
const MainJumbotron = styled(motion.div)`
    @media (max-width: 1000px) {
        ${Item}:last-of-type h3 {
            margin-bottom: 1.8rem;
        }
    }
`;

// * styled Container
const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-direction: ${({ direction }) => direction};
    justify-content: space-between;
    max-width: 1100px;
    margin: auto;
    width: 100%;
    margin-bottom: 2rem;
    @media (max-width: 600px) {
        gap: 0;
        flex-direction: column;
        text-align: center;
    }
`;

// * styled Position
const Position = styled.div`
    width: 50%;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 1rem;
    }
`;

// * styled Title
const Title = styled.h1`
    font-size: clamp(1.2rem, 2vw, 2.8rem);
    line-height: 1.4;
    letter-spacing: 0.14rem;
    margin-bottom: 0.8rem;
`;

// * styled SubTitle
const SubTitle = styled.h3`
    letter-spacing: 0.15rem;
    font-family: "Inconsolata";
    font-size: clamp(0.7rem, 1.4vw, 1.7rem);
    font-weight: normal;
    line-height: 1.4;
`;

// * styled Image
const Image = styled.img`
    max-width: 100%;
    height: auto;
    object-fit: cover;
`;
