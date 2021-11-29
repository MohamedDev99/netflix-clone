import React from "react";
import useContent from "../features/useContent";
import { Footer, Forms } from "../components";
import { HeaderContainer } from "../components/Header";

function Signin() {
    return (
        <>
            <HeaderContainer text="Sign Up" link="/signup">
                <Forms />
            </HeaderContainer>
            <Footer />
        </>
    );
}

export default Signin;
