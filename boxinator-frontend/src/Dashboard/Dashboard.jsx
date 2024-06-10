import './Dashboard.css'
import { useContext } from 'react'
import { UserContext } from "../App";
import RoleDashboard from './RoleDashboard/RoleDashboard';
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user, lightTheme } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className="dashboard" id = {lightTheme ? 'dashboard-light' : 'dashboard-dark'}>
            <h2>Dashboard</h2>

            {user.role === 0 && (
                <RoleDashboard pathEnd={"getAllOrders"} />
            )}

            {user.role === 1 && (
                <RoleDashboard pathEnd={"getAllUserOrders"} />
            )}

            {(user.role !== 0 && user.role !== 1) && (
                <>
                    <p>As a guest you are not logged in, but you can still place orders.</p>
                    <p>No personal information is stored when you place an order as a guest.</p>
                    <p>If you want to track your order/s, you can register for an account before or after placing your order/s.</p>
                    <p>
                        To place an order, go to
                        <button className="new-shipment-btn" onClick={() => navigate(`/newshipment`)}> New Shipment.</button>
                    </p>
                </>
            )}
        </div>
    )
}

export default Dashboard