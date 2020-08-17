import React from 'react';
import Container from './Container';
import './Post.css';

class Post extends React.Component {

  renderBody() {
    return this.props.paragraphs.map((paragraph, i) =>
      (<div key={i} className="Paragraph">{paragraph}</div>)
    )
  }

  render() {
    return (
      <Container>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Text&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Amiri&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond&display=swap" rel="stylesheet"></link>

        <a className="Title" href="#/writing">
          {this.props.title}
        </a>
        <div className="Subtitle">
          {this.props.subtitle}
        </div>
        {this.renderBody()}
      </Container>
    )
  }
}

export default Post;