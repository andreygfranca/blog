import React from 'react';
import Body from './Body';
import Title from './Title';
import {
    BrowserRouter as Router,
    Link
}
from "react-router-dom";

class Post extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (
            <Router>
                <div className="post">
                    <Link to={`/post/${this.props.url}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <Title title={this.props.title}></Title>
                    </Link>
                    <Body content={this.props.content}></Body>
                </div>
            </Router>
        )
    }

}

export default Post;