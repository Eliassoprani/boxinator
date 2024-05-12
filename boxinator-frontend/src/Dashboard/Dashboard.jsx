import './Dashboard.css'
import { useContext } from 'react'
import { UserContext } from "../App";
import UserDashboard from '../UserDashboard/UserDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
function Dashboard() {
    const { user, loggedIn } = useContext(UserContext);

    return (
        <>
            <div className="dashboard">
                <div>Dashboard</div>
                {loggedIn && user.role === 0 ? <AdminDashboard /> : <UserDashboard />}
            </div>
        </>
    )
}

export default Dashboard