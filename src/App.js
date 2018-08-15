import React, { Component } from 'react';
import Repositories from './Repositories'

class App extends Component {
  render() {
    return (
      <div>
        <Repositories organization='nodejs' />
      </div>
    );
  }
}

export default App;
