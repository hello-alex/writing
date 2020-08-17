import React from 'react';
import './App.css';
import PostLink from './components/PostLink';
import Container from './components/Container';

class App extends React.Component {

  posts = require('./posts/registry.json').posts;

  renderPosts() {
    return this.posts.map((post) =>
      (<PostLink key={post} text={post} href={`#/writing/${post.replace(/\./g,"")}`} />)
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
