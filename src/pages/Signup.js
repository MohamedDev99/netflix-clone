import React from "react";
import { Footer, Forms } from "../components";
import { HeaderContainer } from "../components/Header";

function Singup() {
    return (
        <>
            <HeaderContainer text="Sign In" link="/signin">
                <Forms signUpForm={true} />
            </HeaderContainer>
            <Footer />
        </>
    );
}

export default Singup;
