import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Post from './components/Post';
import App from './App';

class AppRouter extends React.Component {

  posts = require('./posts/registry.json').posts;

  routePosts() {
    return this.posts.map((post) => {
      let postJson = require(`./posts/${post}.json`)
      return (
        <Route key={post} path={`/writing/${post.replace(/\./g,"")}`}>
          <Post
            title={postJson.title}
            subtitle={postJson.subtitle}
            paragraphs={postJson.paragraphs}
          />
        </Route>
      )
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {[
              ...this.routePosts(),
              <Route path="/writing/test" key="/test">
                <Post title="Title" subtitle="Subtitle" paragraphs={[]} />
              </Route>,
              <Route path="/" key="/">
                <App />
              </Route>,
            ]}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default AppRouter;
