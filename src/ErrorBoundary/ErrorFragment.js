import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ErrorFragment = ({ error, errorInfo = null }) => (
  <Fragment>
    <h2>Oops</h2>
    <p>An error happened.</p>
    <details className="error-details">
      {error && error.toString()}
      <br />
      {errorInfo !== null && errorInfo.componentStack}
    </details>
  </Fragment>
)
ErrorFragment.propTypes = {
  error: PropTypes.shape({
    toString: PropTypes.func.isRequired
  }),
  errorInfo: PropTypes.shape({
    componentStack: PropTypes.string.isRequired
  })
}
export default ErrorFragment;