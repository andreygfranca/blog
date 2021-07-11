import { TagIcon } from '@primer/octicons-react';
import React, { Component } from 'react';

class Tags extends Component {

    constructor(props) {
        super(props);
        this.tag = props.tag
    }


    render() {
        return (
            <div className="post__tag">
                <div className="post__tag__icon">
                    <TagIcon size={18} />
                </div>
                <div className="post__tag__content">
                    <span>{this.tag}</span>
                </div>
            </div>
        );
    }
}

export default Tags;