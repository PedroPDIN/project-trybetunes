import React, { Component } from 'react';
import '../css/Loading.css';

class Loading extends Component {
  render() {
    return (
      <div>
        <span className="span">
          Carregando...
          <progress />
        </span>
      </div>
    );
  }
}

export default Loading;
