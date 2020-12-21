import React, { Component } from 'react';

class Body extends Component {

    constructor(props) {
        super()
        this.props = props
    }

    render() {
        return (
            <div className="blog-body-content">
                <p dangerouslySetInnerHTML={{__html: this.props.content}}></p>
            </div>
        );
    }
}

export default Body;