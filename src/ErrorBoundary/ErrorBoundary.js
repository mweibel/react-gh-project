import React, { Component } from 'react';
import ErrorFragment from './ErrorFragment';
import './ErrorBoundary.css';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    const { error, errorInfo } = this.state;

    if (error || errorInfo) {
      return <ErrorFragment error={error} errorInfo={errorInfo} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
