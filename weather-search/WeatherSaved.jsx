import React, { Component } from 'react';

class WeatherSaved extends Component {
    render() {
        return (
            <form
                onSubmit={(e) => {
                    this.handleWeatherSavedSubmit(e);
                }}
            >
                <ul id="weather-saved">
                    <li>
                        <button className="btn btn-default" id="save-button" type="submit">Save</button>
                    </li>
                </ul>
            </form>
        );
    }

    handleWeatherSavedSubmit(e) {
        e.preventDefault();
        this.props.onWeatherSavedSubmit(this.props.saved);
    }
}

export default WeatherSaved;
