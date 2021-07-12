import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Body extends Component {
  constructor(props) {
    super();
    this.content = props.content;
  }

  render() {
    return (
      <div className="post__body">
        {/* eslint-disable-next-line react/no-danger */}
        <p dangerouslySetInnerHTML={{ __html: this.content }} />
      </div>
    );
  }
}

Body.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Body;
