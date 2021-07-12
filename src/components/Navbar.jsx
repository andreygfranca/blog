import React, { Component } from 'react';

// eslint-disable-next-line react/prefer-stateless-function
class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="topnav">
          <div className="topnav__content">
            <a href="/">Blog</a>
            <a href="#contact">Contact</a>
            <a href="#about">About</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
