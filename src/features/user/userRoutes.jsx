import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(()=> import('./pages/home'))

export default function UserRoutes(){
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )
}