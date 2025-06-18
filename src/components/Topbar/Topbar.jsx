import { useState } from "react";
import { setSelectLocation, toggleRefresh } from "../../store/weatherSlice";
import { useDispatch } from "react-redux";
import './Topbar.scss';

const Topbar = () => {

    const [location, setLocation] = useState('');
    const dispatch = useDispatch();

    const handleResetLocation = () => {
        dispatch(setSelectLocation(null));
    }

    const handleRefresh = () => {
        dispatch(toggleRefresh());
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (location.trim() !== '') {
            dispatch(setSelectLocation(location));
            setLocation('');
        }
    }

    return (
        <div className="topbar">
            <form className="location-form" onSubmit={handleSubmit}>
                <label htmlFor="change-location">Zmień lokalizację:</label>
                <input
                    id="change-location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button type="submit">Zmień</button>
                <button type="button" onClick={handleResetLocation}>
                    Użyj bieżącej lokalizacji
                </button>
                <button type="button" onClick={handleRefresh}>
                    Odśwież dane
                </button>
            </form>
        </div>
    )
}

export default Topbar;