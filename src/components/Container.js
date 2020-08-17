import React from 'react';
import './Container.css';

class Container extends React.Component {
  render() {
    return (
      <div className="Wrapper">
        {this.props.children}
      </div>
    )
  }
}

export default Container;
