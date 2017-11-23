import React, { Component } from 'react';

class WeatherSearch extends Component {
    render() {
        return (
            <form
                onSubmit={(e) => {
                    this.handleWeatherSearchSubmit(e);
                }}
            >
                <ul id="weather-search">
                    <li>
                        <div className="input-group">
                            <input
                                type="text"
                                id="input-box"
                                className="form-control"
                                ref="inputBox"
                                placeholder="eg. Seattle, 98115"
                            />
                            <button className="search btn btn-primary" type="submit">Search</button>
                        </div>
                    </li>

                </ul>
            </form>
        );
    }

    handleWeatherSearchSubmit(e) {
        e.preventDefault();
        var item = this.refs.inputBox.value;
        this.props.onWeatherSearchSubmit(item);
    }
}

export default WeatherSearch;
