import React, { Component } from 'react';

class Body extends Component {

    constructor(props) {
        super()
        this.props = props
    }

    render() {
        return (
            <div className="post__body">
                <p dangerouslySetInnerHTML={{__html: this.props.content}}></p>
            </div>
        );
    }
}

export default Body;