import React from 'react';
import Body from './Body';
import Title from './Title';
import PostView from './PostView';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
}
from "react-router-dom";

class Post extends React.Component {

    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (
            <Router>
                <div className="blogs-list">
                    <Link to={`/${this.props.url}`}>
                        <Title title={this.props.title}></Title>
                    </Link>
                    <Body content={this.props.content}></Body>
                </div>
                <Switch>
                    <Route path="/:postUrl">
                    <PostView></PostView>
                    </Route>
                </Switch>
            </Router>
        )
    }

}

export default Post;