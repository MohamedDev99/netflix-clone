import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { getUser } from "../features/userSlice";

export default function ProRoute({ children }) {
    const user = useSelector(getUser);
    return user ? children : <Navigate to="/signin" />;
}
