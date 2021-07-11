import { CalendarIcon } from '@primer/octicons-react';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Body from './Body';
import Tags from './Tags';
import Title from './Title';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.url = props.url;
    this.date = props.date;
    this.content = props.content;
    this.tags = props.tags;
  }

  render() {
    return (
      <Router>
        <div className="post">
          <Link to={`/articles/${this.url}`} style={{ textDecoration: 'none', color: 'black' }}>
            <Title title={this.title} />
          </Link>
          <div className="post__date">
            <CalendarIcon size={14} />
            <span className="post__date__value">{this.date}</span>
          </div>
          <Body content={this.content} />

          <div className="post__tag">
            {this.tags.map((t) => (
              <Tags tag={t} />
            ))}
          </div>
        </div>
      </Router>
    );
  }
}

Post.propTypes = {
  content: PropTypes.string.isRequired,
  tags: PropTypes.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Post;
