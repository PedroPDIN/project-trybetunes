import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div>
        <span>
          Carregando...
          <progress />
        </span>
      </div>
    );
  }
}

export default Loading;
