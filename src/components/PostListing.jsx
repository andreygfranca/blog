import React from 'react';
import PostFile from '../posts/build/json/posts_db.json';
import Post from './Post';

class PostListing extends React.Component {
  constructor() {
    super();
    this.posts = Object.values(PostFile);
  }

  render() {
    return (
      <div>
        {this.posts.map((post) => (
          <div style={{ marginBottom: 40 }}>
            <Post
              title={post.title}
              author={post.author}
              content={post.body}
              url={post.url}
              date={post.date}
              tags={post.tags}
            />

            <hr className="center-diamond" />
          </div>
        ))}
      </div>
    );
  }
}

export default PostListing;
