import React, { Component } from 'react';
import './App.css';
import WeatherSaved from './WeatherSaved';
import WeatherSearch from './WeatherSearch';
import WeatherCurrent from './WeatherCurrent';
import SavedLocations from './SavedLocations';
import Header from './Header';
import Error from './Error';

// API key from https://openweathermap.org/
var OPEN_WEATHER_KEY = '349394e7cecf514d7dbe78dea952379b';
var url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + OPEN_WEATHER_KEY + "&";
var STORAGE_KEY = 'savedLocations';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            query: '',
            location: '',
            temp: '',
            shortInfo: '',
            longInfo: '',
            icon: '',
            error: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
        // localStorage.clear();
        var savedListString = localStorage.getItem(STORAGE_KEY);
        var savedListArray = JSON.parse(savedListString) || [];
        this.setState({
            list: savedListArray
        });
        if (savedListArray.length > 0) {
            var initial = JSON.parse(savedListString)[0];
            url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + OPEN_WEATHER_KEY + "&";
            if (parseInt(initial)) {
                url += 'zip=' + initial;
            } else {
                url += 'q=' + initial;
            }
            fetch(url + '&units=imperial')
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    this.setState({
                        location: json.name,
                        temp: Math.round(json.main.temp),
                        shortInfo: json.weather[0].main,
                        longInfo: json.weather[0].description,
                        icon: 'http://openweathermap.org/img/w/' + json.weather[0].icon + '.png'
                    });
                })
                .catch((error) => {
                    this.setError(error);
                });
        }
    }

    render() {
        var arrayIsNotEmpty = this.state.location;
        return (
            <div>
                <Header />
                <div className="left-section">
                    <WeatherSearch
                        onWeatherSearchSubmit={(item) => {
                            this.handleWeatherSearchSubmit(item);
                        }}
                    />

                    {arrayIsNotEmpty ? (
                        <div>
                            <WeatherCurrent
                                location={this.state.location}
                                temp={this.state.temp}
                                shortInfo={this.state.shortInfo}
                                longInfo={this.state.longInfo}
                                icon={this.state.icon}
                                list={this.state.list}
                            />
                            <WeatherSaved
                                onWeatherSavedSubmit={(item) => {
                                    this.handleWeatherSavedSubmit(item);
                                }}
                                saved={this.state.query}
                                list={this.state.list}
                            />
                        </div>
                    ) : (
                        <div />
                    )};

                    {this.state.error ? (
                        <Error
                            errorMessage={this.state.errorMessage}
                        />
                    ) : (
                        <div id="error" />
                    )}
                </div>

                <SavedLocations
                    list={this.state.list}
                    onWeatherSavedClicked={(item) => {
                        this.handleWeatherSavedClicked(item);
                    }}
                    onRemove={(item) => {
                        this.handleRemove(item);
                    }}
                />
            </div>
        );
    }

    handleWeatherSearchSubmit(item) {
        this.setState({
            error: false,
            errorMessage: ''
        });
        url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + OPEN_WEATHER_KEY + "&";
        if (parseInt(item)) {
            url += 'zip=' + item;
        } else {
            url += 'q=' + item;
        }
        fetch(url + '&units=imperial')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    location: json.name,
                    query: item,
                    temp: Math.round(json.main.temp),
                    shortInfo: json.weather[0].main,
                    longInfo: json.weather[0].description,
                    icon: 'http://openweathermap.org/img/w/' + json.weather[0].icon + '.png'
                });
            })
            .catch((error) => {
                this.setError("invalid location");
            });
    }

    handleWeatherSavedClicked(item) {
        url = 'https://api.openweathermap.org/data/2.5/weather?appid=' + OPEN_WEATHER_KEY + "&";
        if (parseInt(item)) {
            url += 'zip=' + item;
        } else {
            url += 'q=' + item;
        }
        fetch(url + '&units=imperial')
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    location: json.name,
                    temp: Math.round(json.main.temp),
                    shortInfo: json.weather[0].main,
                    longInfo: json.weather[0].description,
                    icon: 'http://openweathermap.org/img/w/' + json.weather[0].icon + '.png'
                });
            })
            .catch((error) => {
                this.setError("location cannot be saved");
            });
    }

    handleRemove(item) {
        var toFilter = this.state.list;
        function toRemove(value) {
            return value !== item;
        }
        toFilter = this.state.list.filter(toRemove);
        this.setState({
            list: toFilter
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toFilter));
    }

    setError = (message) => {
        this.setState({
            error: true,
            errorMessage: message
        });
    }

    clearError = () => {
        this.setState({
            error: false,
            errorMessage: ''
        });
    }

    handleWeatherSavedSubmit(item) {
        if (!this.state.list.includes(item)) {
            this.clearError();
            var newList = this.state.list.concat([ item ]);
            this.setState({
                list: newList
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
        } else {
            this.setError(item + ' cannot be saved');
        }

    }
}

export default App;
