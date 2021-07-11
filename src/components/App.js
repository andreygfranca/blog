import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import PostListing from './PostListing';
import PostView from './PostView';

class App extends Component {
    render() {
        return (
            <div className="home main">
                <Navbar />
                <BrowserRouter>
                    <Switch>
                        <Route path="/articles/:postId">
                            <PostView></PostView>
                        </Route>
                        <Route path="/">
                            <PostListing></PostListing>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;