import React from 'react';
import Container from './Container';
import './Post.css';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

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
      console.log("password required");
    }
    this.downloadFile(this.props.title);
  }

  async getPassword() {
    let db = firebase.firestore();
    let querySnapshot = await db.collection("passwords").where("password", "==", "airbnb").get()
    console.log(querySnapshot.empty);
    querySnapshot.docs.map((doc) => console.log(doc.id, " => ", doc.data()));
  }

  async passwordRequired() {
    let querySnapshot =
      await firebase.firestore().collection("posts").where("name", "==", this.props.title).get();
    if (querySnapshot.empty) {
      return false;
    }
    return querySnapshot.docs[0].data().passwordRequired || false;
  }

  async downloadFile(filename) {
    let url = await firebase.storage().ref().child(`posts/${filename}.txt`).getDownloadURL()

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    var self = this;
    xhr.onload = function (event) {
      var blob = xhr.response;
      self.processFile(blob);
    };
    xhr.open('GET', url);
    xhr.send();
  }

  async processFile(blob) {
    let text = await blob.text();
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
