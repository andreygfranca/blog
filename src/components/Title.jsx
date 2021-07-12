import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Title extends Component {
  constructor(props) {
    super();
    this.title = props.title;
  }

  render() {
    return (
      <div>
        <h1 className="post__title">{this.title}</h1>
      </div>
    );
  }
}

Title.propTypes = {
  title: PropTypes.isRequired,
};

export default Title;
