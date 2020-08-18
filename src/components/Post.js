import React from 'react';
import Container from './Container';
import './Post.css';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import md5 from '../utils/md5';

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      subtitle: '',
      paragraphs: [],
    }
  }

  async componentDidMount() {
    if (await this.passwordRequired()) {
      let authenticated = await this.authenticate();
      if (!authenticated) {
        alert("Still wrong, bye.");
        return;
      }
    }
    this.downloadFile(this.props.title);
  }

  async authenticate() {
    for (let attempt = 0; attempt < 2; attempt++) {
      let authenticated = await this.tryPassword(attempt);
      if (authenticated) {
        return true;
      }
    }
    return false;
  }

  async tryPassword(attempt) {
    let plaintext = window.prompt(attempt === 0 ? "Password:" : "Wrong, try again?");
    if (!plaintext) {
      return false;
    }
    let ciphertext = md5(plaintext.trim().toLowerCase() + "salt");
    let querySnapshot = await firebase.firestore().collection("passwords").where("password", "==", ciphertext).get()
    if (querySnapshot.empty) {
      return false;
    }
    return true;
  }

  async passwordRequired() {
    let querySnapshot =
      await firebase.firestore().collection("posts").where("name", "==", this.props.title).get();
    if (querySnapshot.empty) {
      return true;
    }
    return false;
  }

  async downloadFile(filename) {
    let url = await firebase.storage().ref().child(`posts/${filename}.txt`).getDownloadURL()

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'text';
    var self = this;
    xhr.onload = function (event) {
      self.processFile(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
  }

  processFile(text) {
    let lines = text.split('\n');
    this.setState({
      ...this.state,
      title: lines[0],
      subtitle: lines[1],
      paragraphs: lines.slice(2),
    });
  }

  renderBody(paragraphs) {
    return paragraphs
      .map((p) => p.trim())
      .filter((p) => p.length !== 0)
      .map((paragraph, i) =>
        (<div key={i} className="Paragraph">{paragraph}</div>)
      )
  }

  render() {
    let { title, subtitle, paragraphs } = this.state;

    return (
      <Container>
        {this.fonts()}

        <a className="Title" href="/writing">
          {title}
        </a>
        <div className="Subtitle">
          {subtitle}
        </div>
        {this.renderBody(paragraphs)}
      </Container>
    )
  }

  fonts() {
    return (
      <div>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap" rel="stylesheet" />
      </div>
    )
  }
}

export default Post;
