import React from 'react';
import Body from './Body';
import Title from './Title';

class Post extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return <div className="blogs-list">
            <Title title = {this.props.title}></Title>
            <Body content = {this.props.content}></Body>
        </div> 
    }
}

export default Post;