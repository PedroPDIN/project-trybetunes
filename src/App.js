import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
