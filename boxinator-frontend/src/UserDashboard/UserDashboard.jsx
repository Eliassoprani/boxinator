import { useContext } from 'react'
import { UserContext } from "../App";

function UserDashboard() {
    const { user } = useContext(UserContext);

    return (
        <>
            USER DASHBOARD
        </>
    )
}

export default UserDashboard