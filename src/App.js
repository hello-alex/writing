import React from 'react';
import './App.css';
import PostLink from './components/PostLink';
import Container from './components/Container';

class App extends React.Component {

  renderPosts() {
    return this.props.posts.map((post) =>
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
