import React from 'react';
import './App.css';
import PostLink from './components/PostLink';
import Container from './components/Container';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

class App extends React.Component {

  posts = require('./posts/registry.json').posts;

  async getPassword() {
    let db = firebase.firestore();
    let querySnapshot = await db.collection("passwords").where("password", "==", "airbnb").get()
    console.log(querySnapshot.empty);
    querySnapshot.docs.map((doc) => console.log(doc.id, " => ", doc.data()));
  }

  async downloadFile() {
    let storage = firebase.storage();
    let storageRef = storage.ref();
    let url = await storageRef.child('posts/2020.05.22.txt').getDownloadURL()

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function (event) {
      var blob = xhr.response;
      console.log(blob);
    };
    xhr.open('GET', url);
    xhr.send();
  }

  componentDidMount() {
    this.getPassword();
    this.downloadFile();
  }

  renderPosts() {
    return this.posts.map((post) =>
      (<PostLink key={post} text={post} to={`/${post.replace(/\./g, "")}`} />)
    )
  }

  render() {
    return (
      <Container>
        {this.renderPosts()}
      </Container>
    )
  }
}

export default App;
