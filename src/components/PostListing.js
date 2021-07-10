import React from 'react';
import Post from './Post';
import PostFile from '../posts/build/json/posts_db.json';

class PostListing extends React.Component {

    constructor () {
        super()
        this.posts = Object.values(PostFile)
    }

    render() {
        return (
            <div >
            {
                this.posts.map(post => {
                    return (<Post title = {post.title} author = {post.author} content = {post.body} url = {post.url}></Post>)
                })
            }
            </div>
        )
    }
}

export default PostListing;