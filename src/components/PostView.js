import React, { Component } from 'react';

class PostView extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.test = 1
        this.id = window.location.pathname.substring(1);
    }

    render() {
        return (
            <div>
                <p>Ola mundo: {this.id}</p>
            </div>
        );
    }
}

export default PostView;