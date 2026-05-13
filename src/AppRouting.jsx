import { Routes } from "react-router-dom"
import UserRoutes from "./features/user/userRoutes"
import AdminRoutes from "./features/admin/adminRoutes"

function AppRouting(){
    return(
        <>
        <UserRoutes />
        <AdminRoutes />
        </>
    )
}
export default AppRouting