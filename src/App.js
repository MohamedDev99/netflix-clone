import { Home, Browser, SignIn, SignUp, Profile } from "./pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ProRoute } from "./components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { userLogged, userState } from "./features/userSlice";
import { auth } from "./firebase-config";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                return dispatch(userLogged({ isLogged: true }));
            } else {
                return dispatch(userState({ isLogged: false, name: null, email: null, profilePic: null }));
            }
        });
        return unsubscribe;
    }, [dispatch]);

    return (
        <>
            <Router>
                <Routes>
                    <Route index path="/" element={<Home />} />
                    <Route
                        path="/home"
                        element={
                            <ProRoute>
                                <Browser />
                            </ProRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProRoute>
                                <Profile />
                            </ProRoute>
                        }
                    />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </Router>
            <Toaster position="bottom-right" reverseOrder={false} />
        </>
    );
}

export default App;
