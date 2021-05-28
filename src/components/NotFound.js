import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div className="error-page">
          <p
            style={{ color: '#000' }}>
              404. This page does not exist.
          </p>
      </div>
    );
  }
}

export default NotFound;