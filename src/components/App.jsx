import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';
import PostListing from './PostListing';
import PostView from './PostView';

// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="home main">
        <Navbar />
        <BrowserRouter>
          <Switch>
            <Route path="/articles/:postId">
              <PostView />
            </Route>
            <Route path="/">
              <PostListing />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
