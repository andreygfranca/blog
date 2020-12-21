import React, { Component } from 'react';

class Title extends Component {

    constructor(props) {
        super()
        this.props = props
    }

    render() {
        return (
            <div className="blog-title">
                <h1>{this.props.title}</h1>
            </div>
        );
    }
}

export default Title;