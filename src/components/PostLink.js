import React from 'react';
import { Link } from 'react-router-dom';

class PostLink extends React.Component {

  render() {
    return (
      <div style={this.containerStyle}>
        <Link
          style={this.style}
          to={this.props.to}
          target={this.props.openInNewTab ? "_blank" : ""}
          rel="noopener noreferrer">
          {this.props.text}
        </Link>
      </div>
    )
  }

  containerStyle = {
    paddingBottom: "45px",
  }

  style = {
    fontSize: 32,
    fontWeight: 500,
    letterSpacing: "1px",
    color: "lavender",
    fontFamily: "Helvetica Neue",
    textDecoration: "None",
  }
}

export default PostLink;