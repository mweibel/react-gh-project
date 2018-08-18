import React from 'react';
import Repositories from '../Repositories/Repositories';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const App = () => (
  <div className="container">
    <ErrorBoundary>
      <Repositories organization="nodejs" />
    </ErrorBoundary>
  </div>
);
export default App;
