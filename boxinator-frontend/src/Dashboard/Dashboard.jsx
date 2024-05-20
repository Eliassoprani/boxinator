import './Dashboard.css'
import { useContext } from 'react'
import { UserContext } from "../App";
import RoleDashboard from './RoleDashboard/RoleDashboard';

function Dashboard() {
    const { user } = useContext(UserContext);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>

            {user && user.role === 0 && (
                <RoleDashboard pathEnd={"getAllOrders"} />
            )}

            {user && user.role === 1 && (
                <RoleDashboard pathEnd={"getAllUserOrders"} />
            )}

            {(user.role !== 0 && user.role !== 1) && (
                <p>As a guest, you are not logged in but you can still make an order.</p>
            )}

        </div>
    )
}

export default Dashboard