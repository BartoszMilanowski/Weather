import { useState } from "react";
import { setSelectLocation } from "../../store/weatherSlice";
import { useDispatch } from "react-redux";
import './Topbar.scss';

const Topbar = () => {

    const [location, setLocation] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(location.trim() !== ''){
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
            </form>
        </div>
    )
}

export default Topbar;