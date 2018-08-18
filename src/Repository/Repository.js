import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Loading } from '../Loading/Loading';
import './Repository.css';
import { Issue } from '../Issue/Issues';

const Repository = ({
  name,
  index,
  onClick,
  active = false,
  loading = false,
  issues = []
}) => (
  <Fragment>
    <button
      type="button"
      className="button button-clear button-link"
      onClick={event => onClick(event, index, name)}
    >
      {name}
    </button>
    {active && (
      <ul>
        {loading ? (
          <li>
            <Loading />
          </li>
        ) : (
          issues.map(issue => (
            <li key={issue.id}>
              <Issue {...issue} />
            </li>
          ))
        )}
      </ul>
    )}
  </Fragment>
);
Repository.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  loading: PropTypes.bool,
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      html_url: PropTypes.string.isRequired
    }).isRequired
  )
};

export default Repository;
