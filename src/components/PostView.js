import React, { Component } from 'react';
import PostFile from '../posts/build/json/posts_db.json';
import Title from './Title';
import Body from './Body';

class PostView extends Component {

    constructor(props) {
        super(props)
        this.props = props
        this.id = window.location.pathname.substring(6);
        this.post = Object.values(PostFile).filter(post => post.url === this.id);
    }

    render() {
        return (
            <div className="post">
                <Title title={this.post.map(post => post.title)}></Title>
                <Body content={this.post.map(post => post.body)}></Body>
            </div>
        );
    }
}

export default PostView;