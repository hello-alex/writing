import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Post from './components/Post';
import App from './App';
import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

class AppRouter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.fetchPosts();
  }

  async getPassword() {
    let db = firebase.firestore();
    let querySnapshot = await db.collection("passwords").where("password", "==", "airbnb").get()
    console.log(querySnapshot.empty);
    querySnapshot.docs.map((doc) => console.log(doc.id, " => ", doc.data()));
  }

  async fetchPosts() {
    let listResult = await firebase.storage().ref().child('posts').listAll();
    let posts = listResult.items.map((item) => this.removeFileExtension(item.name))
    this.setState({
      ...this.state,
      posts,
    });
  }

  removeFileExtension(filename) {
    return filename.split('.').slice(0, -1).join('.');
  }

  routePosts() {
    return this.state.posts.map((post) => {
      return (
        <Route key={post} path={`/${post.replace(/\./g, "")}`}>
          <Post title={post} />
        </Route>
      )
    })
  }

  render() {
    let { posts } = this.state;
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
                <App posts={posts} />
              </Route>,
            ]}
          </Switch>
        </div>
      </Router>
    )
  }
}

export default AppRouter;
