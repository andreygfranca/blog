import React, { Component } from 'react';

class Title extends Component {

    constructor(props) {
        super()
        this.props = props
    }

    render() {
        return (
            <div >
                <h1 className="post__title">{this.props.title}</h1>
            </div>
        );
    }
}

export default Title;