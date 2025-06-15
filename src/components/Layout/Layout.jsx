import { Outlet } from "react-router-dom";
import './Layout.scss'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Layout = () => {

    const [location, setLocation] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);

    const { weatherConditions } = useSelector((state) => state.weather);

    useEffect(() => {
        setLocation(weatherConditions?.location?.name);
        setLastUpdate(weatherConditions?.current?.last_updated)
    }, [weatherConditions])

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