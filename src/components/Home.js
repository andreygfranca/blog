import React from 'react';
import Post from './Post';
import PostFile from '../posts/build/json/posts_db.json';

class Home extends React.Component {

    constructor () {
        super()
        this.posts = Object.values(PostFile)
    }

    render() {
        return (
            <div className="home">
            {
                this.posts.map(post => {
                    return (<Post title = {post.title} author = {post.author} content = {post.body}></Post>)
                })
            }
            </div>
        )
    }
}

export default Home;