import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../component/customAlert";

export default function ProtectedRoute({ Component }) {
    const [allowed, setAllowed] = useState(null);

    const nevigate = useNavigate()
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        if (!token) {
            window.dispatchEvent(new Event("openLoginModal"));
            nevigate('/')
            setAllowed(false);
        } else {
            setAllowed(true);
        }
    }, []);

    if (allowed === null) return null;
    if (!allowed) return null;
    return <Component />;
}
