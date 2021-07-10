import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <div>
                <div class="topnav">
                    <a href="/">Blog</a>
                    <a href="#contact">Contact</a>
                    <a href="#about">About</a>
                </div>
            </div>
        );
    }
}

export default Navbar;