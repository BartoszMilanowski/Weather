import { Outlet } from "react-router-dom";
import './Layout.scss'

const Layout = ({ location, lastUpdate }) => {

    return (
        <div className="container">
            <div className="layout-top">
                <h2>{location}</h2>
            </div>
            <Outlet />
            <div className="layout-bottom">
                <span className="last-update">Ostatania aktualizacja: {lastUpdate}</span>
            </div>
        </div>
    )
}

export default Layout;