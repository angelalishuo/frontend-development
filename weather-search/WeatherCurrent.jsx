import React, { Component } from 'react';

class WeatherCurrent extends Component {
    render() {
        return (

            <div id="information">
                <h2>{this.props.location}</h2>
                <img alt="icon" src={this.props.icon} />
                <h3>{this.props.temp}°F</h3>
                <h3>&nbsp;&nbsp;&nbsp;{this.props.shortInfo}&nbsp;</h3>
                <h3>({this.props.longInfo})</h3>


            </div>

        );
    }
}

export default WeatherCurrent;
