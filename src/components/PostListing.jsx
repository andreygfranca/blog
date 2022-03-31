import React from 'react';
import PostFile from '../posts/build/json/posts_db.json';
import Post from './Post';

class PostListing extends React.Component {

  constructor() {
    super();
    this.posts = Object.values(PostFile).sort((a, b) => {
      if (Date.parse(a.date) > Date.parse(b.date)) return -1;
      if (Date.parse(a.date) < Date.parse(b.date)) return 1;
      return 0;
    });
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
