import './Dashboard.css'
import { useContext } from 'react'
import { UserContext } from "../App";
import UserDashboard from './UserDashboard/UserDashboard';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import GuestDashboard from './GuestDashboard/GuestDashboard';

function Dashboard() {
    const { user } = useContext(UserContext);

    return (
        <>
            <div className="dashboard">
                <h2>Dashboard</h2>

                {user.role === 0 && (
                    <AdminDashboard />
                )}

                {user.role === 1 && (
                    <UserDashboard />
                )}

                {user.role === 2 && (
                    <GuestDashboard />
                )}

            </div>
        </>
    )
}

export default Dashboard