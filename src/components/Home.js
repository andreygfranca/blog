import React from 'react';
import Post from './Post';
import PostFile from '../posts/build/json/posts_db.json';
import Sidebar from './Sidebar'

class Home extends React.Component {

    constructor () {
        super()
        this.posts = Object.values(PostFile)
    }

    render() {
        return (
            <div className="home main">
            <Sidebar></Sidebar>
            {
                this.posts.map(post => {
                    return (<Post title = {post.title} author = {post.author} content = {post.body} url = {post.url}></Post>)
                })
            }
            </div>
        )
    }
}

export default Home;