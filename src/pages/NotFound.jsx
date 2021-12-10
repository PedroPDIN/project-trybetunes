import React, { Component } from 'react';
import logoFound from '../css/image/logo.png';
import '../css/NotFound.css';

class NotFound extends Component {
  render() {
    return (
      <div
        data-testid="page-not-found"
        className="found"
      >
        <img src={logoFound} alt="logo" className="img-notfound" />
        <p
          className="p-notfound"
        >
          Ops! A página que você esta procurando não foi encontrada.
        </p>
      </div>
    );
  }
}

export default NotFound;
