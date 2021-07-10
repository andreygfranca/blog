import React from 'react';
import Post from './Post';
import PostFile from '../posts/build/json/posts_db.json';

class PostListing extends React.Component {

    constructor() {
        super()
        this.posts = Object.values(PostFile)
    }

    render() {
        return (
            <div>
                {
                    this.posts.map(post => {
                        return (
                            <div style={{marginBottom: 40}}>
                                <Post
                                    title={post.title}
                                    author={post.author}
                                    content={post.body}
                                    url={post.url}
                                    date={post.date}
                                    tags={post.tags}>
                                </Post>

                                <hr class="center-diamond"/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default PostListing;