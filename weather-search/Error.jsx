import React, { Component } from 'react';

class Error extends Component {
    render() {
        return (
            <div id="error" className="alert alert-danger" role="alert">{this.props.errorMessage}</div>
        );
    }
}

export default Error;
