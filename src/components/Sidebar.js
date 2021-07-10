import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <a href="#">About</a>
                <a href="#">Blog</a>
                <a href="#">Projects</a>
                <a href="#">Contact</a>
            </div>
        );
    }
}

export default Sidebar;