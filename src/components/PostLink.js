import React from 'react';

class PostLink extends React.Component {

  render() {
    return (
      <div style={this.containerStyle}>
        <a
          style={this.style}
          href={this.props.href}
          target={this.props.openInNewTab ? "_blank" : ""}
          rel="noopener noreferrer">
          {this.props.text}
        </a>
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