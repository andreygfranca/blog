import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PostListing from './PostListing';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import PostView from './PostView';

class App extends Component {
    render() {
        return (
            <div className="home main">
                {/* <Sidebar/> */}
                <Navbar/>
                <BrowserRouter>
                    <Switch>
                        <Route path="/post/:postId">
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