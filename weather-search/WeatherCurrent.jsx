import React, {Component} from 'react';

class SavedLocations extends Component {
    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading"><h4>Saved Locations</h4></div>
                <ul className="list-group" id="weather-saved">
                    {this.props.list.map((item, index) => {
                        return (
                            <li className="list-group-item" id="location-saved" key={index}>
                                <button className="saved-places"
                                    onClick={e => {
                                        this.handleWeatherSavedClicked(item);
                                    }}
                                >{item}</button>
                                <button className="remove"
                                    onClick={e => {
                                        this.handleRemove(item);
                                    }}
                                >Remove</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    handleWeatherSavedClicked(item) {
        this.props.onWeatherSavedClicked(item);
    }

    handleRemove(item) {
        this.props.onRemove(item);
    }
}

export default SavedLocations;
