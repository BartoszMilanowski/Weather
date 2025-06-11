import { Outlet } from "react-router-dom";
import './Layout.scss'

const Layout = ({ location }) => {

    return (
        <div className="container">
            <div className="layout-top">
                <h2>{location}</h2>
            </div>
            <Outlet />
        </div>
    )
}

export default Layout;