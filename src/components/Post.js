import { CalendarIcon } from '@primer/octicons-react';
import React from 'react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import Body from './Body';
import Tags from './Tags';
import Title from './Title';

class Post extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (
            <Router>
                <div className="post">
                    <Link to={`/articles/${this.props.url}`} style={{ textDecoration: 'none', color: 'black' }}>
                        <Title title={this.props.title}></Title>
                    </Link>
                    <div className="post__date">
                        <CalendarIcon size={14} />
                        <span className="post__date__value">{this.props.date}</span>
                    </div>
                    <Body content={this.props.content}></Body>

                    <div className="post__tag">
                        {this.props.tags.map(t => { return (<Tags tag={t}></Tags>) })}
                    </div>
                </div>
            </Router>
        )
    }

}

export default Post;